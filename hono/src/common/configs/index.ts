export class Config {
  get value() {
    return {
      /**
       * opencode 代理配置
       */
      agent: {
        server: {
          port: 4039,
        },
      },
    };
  }
}
