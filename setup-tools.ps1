# PowerShell Setup Script for CLI Tools
# Installs gcloud, Claude CLI, and Codex CLI

Write-Host "Installing Google Cloud CLI (gcloud)..."
# Download and install gcloud (manual step for Windows)
Start-Process "https://cloud.google.com/sdk/docs/install" -Wait
Write-Host "Please follow the installer instructions, then restart your terminal."

Write-Host "Installing Claude CLI..."
npm install -g claude-cli

Write-Host "Installing Codex CLI..."
npm install -g codex-cli

Write-Host "Setup complete!"
Write-Host "Run 'gcloud init' to configure gcloud."
Write-Host "Run 'claude config set api_key <YOUR_API_KEY>' to configure Claude."
Write-Host "Run 'codex config set api_key <YOUR_API_KEY>' to configure Codex."
