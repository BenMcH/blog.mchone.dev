export const GA_TRACKING_ID = "UA-174251979-1";

declare global {
	interface Window {
		gtag: (
			option: string,
			gaTrackingId: string,
			options: Record<string, unknown>
		) => void;
	}
}

export const pageview = (url: string) => {
	if (!window.gtag) {
		console.warn(
			"window.gtag is not defined. This could mean your google anylatics script has not loaded on the page yet."
		);
		return;
	}
	window.gtag("config", GA_TRACKING_ID, {
		page_path: url,
	});
};
