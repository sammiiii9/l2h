import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const dir = process.cwd();

async function run() {
  const token = process.env.GITHUB_TOKEN || process.argv[2];
  if (!token) {
    console.log('\n⚠️ No GITHUB_TOKEN provided.\n');
    return;
  }

  const authenticatedUrl = `https://${token}@github.com/sammiiii9/l2h.git`;

  console.log('🚀 Initializing & preparing repository...');
  try {
    await git.init({ fs, dir, defaultBranch: 'main' });
    console.log('✅ Git repository initialized.');
  } catch (e) {}

  try {
    await git.addRemote({ fs, dir, remote: 'origin', url: authenticatedUrl, force: true });
    console.log(`✅ Remote origin set.`);
  } catch (e) {}

  console.log('📦 Staging files...');
  const status = await git.statusMatrix({ fs, dir });

  for (const [filepath, head, workdir, stage] of status) {
    if (filepath.startsWith('node_modules') || filepath.startsWith('.next') || filepath.startsWith('.git')) {
      continue;
    }
    if (workdir === 0) {
      await git.remove({ fs, dir, filepath });
    } else if (workdir !== stage) {
      await git.add({ fs, dir, filepath });
    }
  }
  console.log('✅ All project files staged.');

  try {
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: 'sammiiii9',
        email: 'sammiiii9@users.noreply.github.com',
      },
      message: 'Production release: L2H Solution Real Estate Advisory Platform'
    });
    console.log(`✅ Commit created: ${sha}`);
  } catch (e) {
    console.log('ℹ️ Commit status:', e.message);
  }

  console.log('🚀 Pushing to GitHub (sammiiii9/l2h)...');
  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      url: authenticatedUrl,
      remote: 'origin',
      ref: 'main',
      remoteRef: 'refs/heads/main',
      force: true,
      headers: {
        'Authorization': `token ${token}`
      },
      onAuth: () => ({
        username: token,
        password: ''
      })
    });
    console.log('🎉 PUSH SUCCESSFUL!', JSON.stringify(pushResult, null, 2));
  } catch (pushErr) {
    console.error('❌ Push error:', pushErr);
  }
}

run().catch(console.error);
