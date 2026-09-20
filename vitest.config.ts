import { defineConfig } from 'vitest/config'
export default defineConfig({
    test: {
        globalSetup: 'tests/globalSetup.ts',
        typecheck: {
            tsconfig: "tests/tsconfig.test.json"
        }
    }
});