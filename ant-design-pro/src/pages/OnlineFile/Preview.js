import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, List, Avatar, Icon, Tooltip, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Preview.less';

class Preview extends PureComponent {
    render() {
        const pageHeaderContent = (
            <div className={styles.title}>
                <div>在线文档预览</div>
                <div>无需安装，快速实现在线文档预览。</div>
            </div>
        )

        return (
            <PageHeaderWrapper
                content={pageHeaderContent}
            >
                <Card bordered={false}>
                    <Fragment>
                        <Card
                            bodyStyle={{ marginBottom: '0px', height: 'auto' }}
                            bordered={false}
                        >
                            <div>
                                <div className={styles.cardtext}>请填写在线文档地址：</div>
                                <div className={styles.cardinput}>
                                    <input type="text" placeholder="该URL的域名必须属于您或未被注册的域名" />
                                    <div>例如：http://dcs.yozosoft.com/yozodoc.docx</div>
                                </div>
                                <div className={styles.cardbtn}>
                                    <button>在线预览</button>
                                </div>
                                <div className={styles.cardresult}>
                                    <div>
                                        <Icon type="check-circle" theme="filled"
                                            style={{
                                                color: 'rgba(58, 193, 126, 1)', fontSize: '24px', top: '50%', transform: 'translateY(-50%)', position: 'absolute' }} />
                                        <span>转换成功</span>
                                    </div>
                                    <div>
                                        <span>
                                            预览地址：
                                            <a href="http://dcsapi.com?k=2032220&url=http://dcs.yozosoft.com/yozodoc.docx">
                                                http://dcsapi.com?k=2032220&url=http://dcs.yozosoft.com/yozodoc.docx
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Divider style={{ margin: '20px 0 24px' }} />
                        <div className={styles.desc}>
                            <h3>说明</h3>
                            <h4>在线预览</h4>
                            <p>
                            预览文档格式、大小是否有限制？
                            </p>
                            <p>
                            是否允许一次转换多个文档？
                            </p>
                            <p>
                            如果允许，最多可转几个？
                            </p>
                        </div>
                    </Fragment>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default Preview;