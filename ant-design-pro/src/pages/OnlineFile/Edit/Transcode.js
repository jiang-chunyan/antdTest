import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, List, Avatar, Icon, Tooltip, Divider, Progress } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import TranscodeWait from './TranscodeWait.js';
import TranscodeFail from './TranscodeFail.js';
import styles from './Transcode.less';

@connect(({ edit }) => ({
    edit,
}))
class Transcode extends PureComponent {
    componentWillMount() {
       
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'edit/fetchEditStateData'
        })
    }

    render() {
        const { edit: { editStateData } } = this.props;
        const pageHeaderContent = (
            <div className={styles.title}>
                <div>在线文档编辑</div>
                <div>无需安装，快速实现在线文档编辑。</div>
            </div>
        )

        const IconFail = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1183117_iai4in6kb8d.js', // 在 iconfont.cn 上生成
        });

        return (
            <Fragment>
                {editStateData && editStateData[0] && editStateData[0].editState === '0' || editStateData && editStateData[0] && editStateData[0].editState === '1' ? 
                    <PageHeaderWrapper
                        content={pageHeaderContent}
                    >
                        <Card bordered={false}>
                            <Fragment>
                                {editStateData && editStateData[0] && editStateData[0].editState === '1' ?
                                    <Card
                                        bodyStyle={{ marginBottom: '0px', height: 'auto' }}
                                        bordered={false}
                                    >
                                        <div className={styles.transcode}>
                                            <div className={styles.cardtext}>请填写在线文档地址：</div>
                                            <div className={styles.cardinput}>
                                                <input type="text" placeholder="该URL的域名必须属于您或未被注册的域名" />
                                                <div>例如：http://dcs.yozosoft.com/yozodoc.docx</div>
                                            </div>
                                            <div className={styles.cardbtn}>
                                                <button>在线编辑</button>
                                            </div>
                                            <div className={styles.cardresult}>
                                                <div className={styles.cardresultsuccess}>
                                                    <div>
                                                        <Icon type="check-circle" theme="filled"
                                                            style={{
                                                                color: 'rgba(58, 193, 126, 1)', fontSize: '24px', top: '50%', transform: 'translateY(-50%)', position: 'absolute'
                                                            }} />
                                                        <span>转换成功</span>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            编辑地址：
                                                        <a href="http://dcsapi.com?k=2032220&url=http://dcs.yozosoft.com/yozodoc.docx">
                                                                http://dcsapi.com?k=2032220&url=http://dcs.yozosoft.com/yozodoc.docx
                                                        </a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={styles.cardresultfail}>
                                                    <div>
                                                        <IconFail type="icon-fail1f" style={{
                                                            color: 'red', fontSize: '24px', top: '50%', transform: 'translateY(-50%)', position: 'absolute'
                                                        }} />
                                                        <span>转换失败</span>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            失败原因
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    : editStateData && editStateData[0] && editStateData[0].editState === '19' ?
                                        <TranscodeWait />
                                        : <TranscodeFail />
                                }
                                <Divider style={{ margin: '20px 0 24px' }} />
                                <div className={styles.desc}>
                                    <h3>说明</h3>
                                    <h4>在线编辑</h4>
                                    <p>编辑文档格式、大小是否有限制？</p>
                                    <p>是否允许一次转换多个文档？</p>
                                    <p>如果允许，最多可转几个？</p>
                                </div>
                            </Fragment>
                        </Card>
                    </PageHeaderWrapper>
                    : null
                }   
                {editStateData && editStateData[0] && editStateData[0].editState === '2' ? <TranscodeFail /> : null}
            </Fragment>
        )
    }
}

export default Transcode;