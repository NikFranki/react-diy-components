import _ from 'lodash';
import CONSTANT from 'constant/index';
import Domains from 'util/domain';

import {
    ActionConfig,
    IActionsConfig
} from 'util/request';

class Api {

    constructor(type: string, domain: string = Domains.members, cfg?: IActionsConfig, defaultAction: boolean = true) {
        const config: IActionsConfig = {
            list: {
                domain,
                url: `${type}/list`,
                method: 'post'
            }
        };
        if (defaultAction) {
            ActionConfig.createAction(Object.assign({}, config, cfg), this);
        } else if (cfg) {
            ActionConfig.createAction(cfg, this);
        }
    }
}

class Tutorial extends Api {
    constructor(type: string) {
        super(type, Domains.category, {
            login: {
                domain: Domains.passport,
                url: `v1/user/login`,
                method: 'post'
            },
            sery_list: {
                domain: Domains.category,
                url: `p/category/list`,
                method: 'post'
            }
        }, false);
    }
}

export const TurtorialApi = new Tutorial(CONSTANT.MOULE.LEMONCODE);

