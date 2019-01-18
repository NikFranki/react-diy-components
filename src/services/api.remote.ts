import _ from 'lodash';
import CONSTANT from 'constant/index';
import Domains from 'util/domain';

import {
    ActionConfig,
    IActionsConfig
} from 'util/request';

class Api {

    constructor(type: string, domain: string = Domains.category, cfg?: IActionsConfig, defaultAction: boolean = true) {
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
            sery_list: {
                domain: Domains.category,
                url: `p/category/list`,
                method: 'post'
            },
            lesson_list: {
                domain: Domains.category,
                url: `p/cover/list`,
                method: 'post'
            },
            content_list: {
                domain: Domains.category,
                url: `p/content/list`,
                method: 'post'
            }
        }, false);
    }
}

export const TurtorialApi = new Tutorial(CONSTANT.MOULE.LEMONCODE);

