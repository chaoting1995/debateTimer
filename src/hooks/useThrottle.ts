import React from 'react';

interface ThrottleFnOptions {
	delay: number;
}

// 自定義的throttle hook
// eslint-disable-next-line
export default function useThrottle<T extends (...args: any[]) => void>(
	callback: T,
	options: ThrottleFnOptions
): (...args: Parameters<T>) => void {
	const { delay } = options;
	const lastExecutedTimeRef = React.useRef<number>(0); // 初始化時間戳

	return React.useCallback(
		(...args: Parameters<T>) => {
			const currentTime = performance.now();
			// 如果距離上次執行已超過delay時間，則執行callback
			if (currentTime - lastExecutedTimeRef.current > delay) {
				callback(...args);
				lastExecutedTimeRef.current = currentTime;
			}
		},
		[callback, delay]
	);
}