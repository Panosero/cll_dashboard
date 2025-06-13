# CLL Dashboard

A comprehensive dashboard for Chronic Lymphocytic Leukemia (CLL) statistics and visualizations, focusing on UK data with international comparisons.

## Features

- **Overview Statistics**: Key metrics including annual UK cases, median age, survival rates, and gender distribution
- **Gender Distribution Analysis**: Detailed breakdown of male vs female cases with seasonal patterns
- **Aging Impact**: Analysis of how population aging affects CLL diagnosis rates
- **Treatment Landscape**: Comparison of treatment guidelines and drug efficacy across UK, EU, and US

## Technology Stack

- React 18
- Recharts for data visualization
- Lucide React for icons
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/cll_dashboard.git
cd cll_dashboard/cll-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/cll_dashboard"
   ```

2. **Push your code** to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages** in your repository settings:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

4. **The deployment will run automatically** when you push to the main branch. You can monitor the progress in the "Actions" tab of your repository.

5. **Access your deployed app** at: `https://Panosero.github.io/cll_dashboard`

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run build
npm run deploy
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys the app to GitHub Pages (manual method)

## Data Sources

- Cancer Research UK
- SEER Database
- BSH Guidelines
- ESMO Guidelines
- NCCN Guidelines

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Medical data sourced from reputable oncology organizations
- Built with modern React best practices
- Responsive design for all device sizes