#!/bin/bash

# Production Build Script for ShipSaaS
# This script handles the complete build process with error handling

set -e  # Exit on any error

echo "🚀 Starting ShipSaaS Production Build..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache
print_success "Cleaned previous builds"

# Step 2: Install dependencies
print_status "Installing dependencies..."
if command -v bun &> /dev/null; then
    print_status "Using bun for dependency installation..."
    bun install
else
    print_status "Using npm for dependency installation..."
    npm install
fi
print_success "Dependencies installed"

# Step 3: Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate
print_success "Prisma client generated"

# Step 4: Process MDX files
print_status "Processing MDX files..."
npx fumadocs-mdx
print_success "MDX files processed"

# Step 5: Build the application
print_status "Building Next.js application..."
npm run build
print_success "Application built successfully"

# Step 6: Optional - Start production server
if [ "$1" = "--start" ]; then
    print_status "Starting production server..."
    npm run start
else
    print_success "Build completed! Run 'npm run start' to start the production server."
    print_status "Or run this script with --start flag to automatically start the server."
fi

echo ""
print_success "🎉 Production build completed successfully!"
echo ""
print_status "Build summary:"
echo "  - Next.js application: ✅ Built"
echo "  - Prisma client: ✅ Generated"
echo "  - MDX files: ✅ Processed"
echo "  - Static pages: ✅ Generated"
echo ""
print_status "To start the production server: npm run start"
print_status "To run in development mode: npm run dev"
