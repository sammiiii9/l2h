# ==============================================================================
# L2H SOLUTION — PUSH REPOSITORY TO GITHUB (sammiiii9/l2h)
# ==============================================================================

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "🚀 Pushing L2H Solution to GitHub (sammiiii9/l2h)" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan

# 1. Ensure Git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Git is not detected in your PATH." -ForegroundColor Yellow
    Write-Host "👉 Please install Git from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "   or install GitHub Desktop: https://desktop.github.com" -ForegroundColor White
    exit 1
}

# 2. Navigate to project root
$projectDir = Split-Path -Parent $PSScriptRoot
Set-Location $projectDir

# 3. Initialize Git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing local Git repository..." -ForegroundColor Yellow
    git init
}

# 4. Configure Remote Repository
$remoteUrl = "https://github.com/sammiiii9/l2h.git"
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "🔗 Updating origin remote to $remoteUrl" -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    Write-Host "🔗 Adding origin remote $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
}

# 5. Stage and Commit
Write-Host "📁 Staging all project files..." -ForegroundColor Yellow
git add .

Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m "Production release: L2H Solution Real Estate Advisory Platform" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ℹ️  No changes to commit or already committed." -ForegroundColor Gray
}

# 6. Set default branch to main and push
Write-Host "🚀 Pushing to GitHub (main branch)..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host "🎉 SUCCESS! Code pushed to: https://github.com/sammiiii9/l2h" -ForegroundColor Green
    Write-Host "=====================================================" -ForegroundColor Green
} else {
    Write-Host "⚠️  If authentication failed, please log in with your GitHub Personal Access Token or GitHub Desktop." -ForegroundColor Yellow
}
