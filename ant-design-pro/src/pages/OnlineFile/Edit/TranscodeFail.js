import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card } from 'antd';
import Link from 'umi/link';
import styles from './TranscodeFail.less';

class TranscodeFail extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.transcoded}>
                    <div>
                        <Icon type="exclamation-circle" style={{ color: 'rgba(255, 66, 0, 1)', fontSize: '48px', marginRight: '15px'}}/>
                        <span>永中云转换提醒您：</span>
                    </div>
                    <div>本次转码失败，请检查您的在线文档地址是否正确。</div>
                    <div>如有需要，请联系客服：400-88*****</div>
                    <div>
                        <button>
                            <a href="../../homepage">返回首页</a>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TranscodeFail;