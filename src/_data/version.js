const { execSync } = require('child_process');

module.exports = () => {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim();
	} catch (error) {
		console.warn('Warning: Could not get git commit SHA, using fallback');
		return Date.now().toString();
	}
};
