#!/bin/bash
set -euo pipefail

ODOO_VERSION="19.0"
REQUIREMENTS_URL="https://raw.githubusercontent.com/odoo/odoo/$ODOO_VERSION/requirements.txt"

echo "🚀 Starting Odoo dependencies setup with uv..."

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    uv sync
    echo "✨ Virtual environment created successfully!"
    source .venv/bin/activate
    echo "🔌 Virtual environment activated!"
fi

echo "📥 Installing Python dependencies directly from URL..."
uv pip install --no-cache-dir -r "$REQUIREMENTS_URL"

echo "✅ All dependencies installed successfully! Environment ready. 🎉"

# Set proper permissions
echo "🔒 Setting directory permissions..."
sudo chmod -R 700 ~/.ssh
echo "✅ Directory permissions configured successfully!"

# Download Odoo server if it doesn't exist
if [ ! -d "odoo" ]; then
    echo "📥 Downloading Odoo server from GitHub..."
    git clone --depth 1 --branch "$ODOO_VERSION" "https://github.com/odoo/odoo.git" odoo
    echo "✅ Odoo server downloaded successfully!"
else
    echo "ℹ️  Odoo server already exists, skipping download."
fi
