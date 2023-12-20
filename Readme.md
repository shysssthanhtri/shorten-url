Create migration
https://github.com/typeorm/typeorm/issues/9104
npm_config_name=test npx nx run user-service:migration:create

Test
https://github.com/typeorm/typeorm/issues/9104
npm_config_path=test npx nx run user-service:test:e2e
