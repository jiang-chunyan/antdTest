import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, List, Avatar, Icon, Tooltip, Divider, Progress } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TranscodeWait.less';

class TranscodeWait extends PureComponent {
    render() {
        const pageHeaderContent = (
            <div className={styles.title}>
                <div>在线文档编辑</div>
                <div>无需安装，快速实现在线文档编辑。</div>
            </div>
        )

        return (
            // <PageHeaderWrapper
            //     content={pageHeaderContent}
            // >
            //     <Card bordered={false}>
            //         <Fragment>
                        <Card
                            bodyStyle={{ marginBottom: '0px', height: '350px' }}
                            bordered={false}
                        >
                            <div className={styles.transcoding}>
                                <Progress percent={33} status="active" />
                                <div>
                                    文档转码中，请耐心等待...
                                </div>
                            </div>
                        </Card>
            //             <Divider style={{ margin: '20px 0 24px' }} />
            //             <div className={styles.desc}>
            //                 <h3>说明</h3>
            //                 <h4>在线编辑</h4>
            //                 <p>
            //                 编辑文档格式、大小是否有限制？
            //                 </p>
            //                 <p>
            //                 是否允许一次转换多个文档？
            //                 </p>
            //                 <p>
            //                 如果允许，最多可转几个？
            //                 </p>
            //             </div>
            //         </Fragment>
            //     </Card>
            // </PageHeaderWrapper>
        )
    }
}

export default TranscodeWait;