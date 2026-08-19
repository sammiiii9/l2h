'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Star, Image as ImageIcon, Plus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { PropertyImage } from '@/types';

interface PropertyImageUploaderProps {
  images: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
  maxImages?: number;
}

export default function PropertyImageUploader({
  images = [],
  onChange,
  maxImages = 6
}: PropertyImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      setError('Please select valid image files (JPEG, PNG, WebP).');
      return;
    }

    if (images.length + fileArray.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images. Currently: ${images.length}.`);
    }

    const filesToUpload = fileArray.slice(0, maxImages - images.length);
    if (filesToUpload.length === 0) return;

    setUploading(true);
    setError('');

    try {
      // First try uploading to /api/upload
      const formData = new FormData();
      filesToUpload.forEach(f => formData.append('files', f));

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.images) {
        const newImgs: PropertyImage[] = data.images.map((item: any, idx: number) => ({
          url: item.url,
          caption: item.caption || `Photo ${images.length + idx + 1}`,
          isFeatured: images.length === 0 && idx === 0
        }));
        onChange([...images, ...newImgs]);
      } else {
        // Fallback: Read as base64 data URLs if API upload fails
        const readPromises = filesToUpload.map(file => {
          return new Promise<PropertyImage>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                url: e.target?.result as string,
                caption: file.name.split('.')[0].replace(/[-_]+/g, ' '),
                isFeatured: false
              });
            };
            reader.readAsDataURL(file);
          });
        });

        const base64Imgs = await Promise.all(readPromises);
        if (images.length === 0 && base64Imgs.length > 0) {
          base64Imgs[0].isFeatured = true;
        }
        onChange([...images, ...base64Imgs]);
      }
    } catch (err) {
      console.error('Error uploading images:', err);
      // Fallback to base64 FileReader
      const readPromises = filesToUpload.map(file => {
        return new Promise<PropertyImage>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              url: e.target?.result as string,
              caption: file.name.split('.')[0].replace(/[-_]+/g, ' '),
              isFeatured: false
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const base64Imgs = await Promise.all(readPromises);
      if (images.length === 0 && base64Imgs.length > 0) {
        base64Imgs[0].isFeatured = true;
      }
      onChange([...images, ...base64Imgs]);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    if (updated.length > 0 && !updated.some(img => img.isFeatured)) {
      updated[0].isFeatured = true;
    }
    onChange(updated);
  };

  const handleSetFeatured = (indexToFeature: number) => {
    const updated = images.map((img, idx) => ({
      ...img,
      isFeatured: idx === indexToFeature
    }));
    // Move featured to position 0
    const [featured] = updated.splice(indexToFeature, 1);
    updated.unshift(featured);
    onChange(updated);
  };

  const handleCaptionChange = (index: number, newCaption: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], caption: newCaption };
    onChange(updated);
  };

  const handleAddManualUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;

    const newImg: PropertyImage = {
      url: manualUrl.trim(),
      caption: `Photo ${images.length + 1}`,
      isFeatured: images.length === 0
    };
    onChange([...images, newImg]);
    setManualUrl('');
    setShowManualUrl(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-slate-200 font-semibold text-xs">
            Property Photos ({images.length}/{maxImages} Uploaded) *
          </label>
          <span className="text-[11px] text-slate-400">
            Upload 4-5 high-resolution photos directly from your device (Facade, Living Room, Bedroom, Balcony, Layout).
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] text-gold hover:underline font-semibold"
        >
          {showManualUrl ? 'Close URL Input' : '+ Add via URL Link'}
        </button>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Manual URL Input dropdown */}
      {showManualUrl && (
        <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-2 text-xs">
          <div className="flex gap-2">
            <input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="Paste image URL (https://...)"
              className="flex-1 px-3 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white placeholder-slate-500 focus:border-gold focus:outline-none font-mono text-[11px]"
            />
            <button
              type="button"
              onClick={handleAddManualUrl}
              className="px-4 py-2 rounded-xl bg-gold text-charcoal-950 font-bold text-xs uppercase"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Direct File Dropzone */}
      {images.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-gold bg-gold/10'
              : 'border-charcoal-700 hover:border-gold/50 bg-charcoal-950/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-2 text-slate-300">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center">
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-0.5">
              <span className="font-semibold text-xs text-white block">
                {uploading ? 'Processing & Uploading Photos...' : 'Click to Browse or Drag & Drop 4-5 Property Photos'}
              </span>
              <span className="text-[11px] text-slate-400 block">
                Supports JPEG, PNG, WebP • Up to 10MB per photo
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Images Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl overflow-hidden bg-charcoal-950 border transition-all ${
                idx === 0 ? 'border-gold ring-2 ring-gold/40' : 'border-charcoal-800'
              }`}
            >
              <div className="h-32 relative overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption || `Property Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Primary Cover Badge */}
                {idx === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-gold text-charcoal-950 font-bold text-[9px] uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>Primary Cover</span>
                  </div>
                )}

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-md"
                      title="Delete Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetFeatured(idx);
                      }}
                      className="w-full py-1.5 rounded-lg bg-charcoal-900/90 text-gold hover:bg-gold hover:text-charcoal-950 text-[10px] font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1"
                    >
                      <Star className="w-3 h-3" />
                      <span>Set as Cover</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Caption Input */}
              <div className="p-2 bg-charcoal-900 border-t border-charcoal-800">
                <input
                  type="text"
                  value={img.caption || ''}
                  onChange={(e) => handleCaptionChange(idx, e.target.value)}
                  placeholder={`Photo ${idx + 1} caption...`}
                  className="w-full px-2 py-1 rounded bg-charcoal-950 border border-charcoal-800 text-[10px] text-slate-300 placeholder-slate-500 focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
