import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// const MIN_COVERAGE = 85;

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
        },
        // testMatch: ['**/*.test.ts'],
        // coverageConfig: {
        //     threshold: {
        //         statements: MIN_COVERAGE,
        //         branches: MIN_COVERAGE,
        //         functions: MIN_COVERAGE,
        //         lines: MIN_COVERAGE,
        //     },
        // },
    }),
);
