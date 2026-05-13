import { Config } from '@/common/configs';
import { Logger } from '@/common/utils';

const config = new Config();

export class Component {
  protected readonly logger: Logger;

  constructor() {
    this.logger = new Logger(new.target.name);
  }

  protected get config() {
    return config.value;
  }
}

export default Component;
