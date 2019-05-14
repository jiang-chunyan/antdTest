import React, { PureComponent, memo } from 'react';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import moment from 'moment';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar, Icon, Tooltip } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud, MiniArea } from '@/components/Charts';
import numeral from 'numeral';
import NumberInfo from '@/components/NumberInfo';
import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './HomePage.less';
import cloud from './image/cloud.png';

const links = [
    {
        title: '操作一',
        href: '',
    },
    {
        title: '操作二',
        href: '',
    },
    {
        title: '操作三',
        href: '',
    },
    {
        title: '操作四',
        href: '',
    },
    {
        title: '操作五',
        href: '',
    },
    {
        title: '操作六',
        href: '',
    },
];

@connect(({ user, project, activities, chart, loading }) => ({
    currentUser: user.currentUser,
    project,
    activities,
    chart,
    currentUserLoading: loading.effects['user/fetchCurrent'],
    projectLoading: loading.effects['project/fetchNotice'],
    activitiesLoading: loading.effects['activities/fetchList'],
}))
class Homepage extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        // dispatch({
        //     type: 'user/fetchCurrent',
        // });
        dispatch({
            type: 'project/fetchNotice',
        });
        // dispatch({
        //     type: 'activities/fetchList',
        // });
        dispatch({
            type: 'chart/fetch',
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'chart/clear',
        });
    }

    renderActivities() {
        const {
            activities: { list },
        } = this.props;
        return list.map(item => {
            const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
                if (item[key]) {
                    return (
                        <a href={item[key].link} key={item[key].name}>
                            {item[key].name}
                        </a>
                    );
                }
                return key;
            });
            return (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.avatar} />}
                        title={
                            <span>
                                <a className={styles.username}>{item.user.name}</a>
                                &nbsp;
                <span className={styles.event}>{events}</span>
                            </span>
                        }
                        description={
                            <span className={styles.datetime} title={item.updatedAt}>
                                {moment(item.updatedAt).fromNow()}
                            </span>
                        }
                    />
                </List.Item>
            );
        });
    }

    render() {
        const {
            currentUser,
            currentUserLoading,
            project: { notice },
            projectLoading,
            activitiesLoading,
            chart: { radarData, visitData2 },
        } = this.props;
        const pageHeaderContent =
            currentUser && Object.keys(currentUser).length ? (
                <div className={styles.pageHeaderContent}>
                    <span className={styles.homePageText}>首页</span>
                    <div className={styles.avatar}>
                        <Avatar size="large" src={currentUser.avatar} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentTitle}>
                            早安，
                    {currentUser.name}
                            ！
                    </div>
                        <div>
                            {currentUser.title} | {currentUser.group}
                        </div>
                    </div>
                </div>
            ) : null;

        const extraContent = (
            <div className={styles.extraContent}>
                <div className={styles.statItem}>
                    <p>域名数</p>
                    <p>56</p>
                </div>
                <div className={styles.statItem}>
                    <p>昨日调用量</p>
                    <p>
                        <span>99</span>
                    </p>
                </div>
                <div className={styles.statItem}>
                    <p>总调用量</p>
                    <p>2,223</p>
                </div>
            </div>
        );

        return (
            <PageHeaderWrapper
                loading={currentUserLoading}
                content={pageHeaderContent}
                extraContent={extraContent}
            >
                <Row gutter={24}>
                    <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            title="调用统计"
                            bodyStyle={{ fontSize: 0, marginBottom: '24px', height: '209px' }}
                            bordered={false}
                        >
                            <NumberInfo
                                subTitle={
                                    <span>
                                        <FormattedMessage id="app.analysis.search-users" defaultMessage="search users" />
                                        <Tooltip title={<FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />}>
                                            <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                                gap={8}
                                total={numeral(12321).format('0,0')}
                                status="up"
                                subTotal={17.1}
                            />
                                <MiniArea line height={45} data={visitData2} />
                        </Card>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.resource-surplus"
                                    defaultMessage="Resource Surplus"
                                />
                            }
                            bodyStyle={{ textAlign: 'center', fontSize: 0, marginBottom: '24px' }}
                            bordered={false}
                        >
                            <WaterWave
                                height={161}
                                title={
                                    <FormattedMessage id="app.monitor.fund-surplus" defaultMessage="Fund Surplus" />
                                }
                                percent={34}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            className={styles.projectList}
                            loading={projectLoading}
                            style={{ marginBottom: 24 }}
                            title="最近转换的文档"
                            extra={<Link to="/">全部文档</Link>}
                            bordered={false}
                            headStyle={{ marginBottom: '0px' }}
                            bodyStyle={{ padding: 0 }}
                        >
                            {notice.map(item => (
                                <Card.Grid className={styles.projectGrid} key={item.id}>
                                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                                        <Card.Meta
                                            title={
                                                <div className={styles.cardTitle}>
                                                    <Avatar size="small" src={item.logo} />
                                                    <Link to={item.href}>{item.title}</Link>
                                                </div>
                                            }
                                            description={item.description}
                                        />
                                        <div className={styles.projectItemContent}>
                                            <Link to={item.memberLink}>{item.member || ''}</Link>
                                            {item.updatedAt && (
                                                <span className={styles.datetime} title={item.updatedAt}>
                                                    {moment(item.updatedAt).fromNow()}
                                                </span>
                                            )}
                                        </div>
                                    </Card>
                                </Card.Grid>
                            ))}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className={styles.boxProducts}>
                            <div className={styles.boxYouYun}>
                                <div>
                                    <img src={cloud} alt="" />
                                    <span>永中优云</span>
                                </div>
                                <div>
                                    <span>此处为产品介绍语</span>
                                </div>
                                <div>
                                    <button>立即使用</button>
                                </div>
                            </div>
                            <div className={styles.boxDCS}>
                                <div>
                                    <img src={cloud} alt="" />
                                    <span>永中DCS</span>
                                </div>
                                <div>
                                    <span>此处为产品介绍语</span>
                                </div>
                                <div>
                                    <button>立即使用</button>
                                </div>
                            </div>
                            <div className={styles.boxWebOffice}>
                                <div>
                                    <img src={cloud} alt="" />
                                    <span>永中web office</span>
                                </div>
                                <div>
                                    <span>此处为产品介绍语</span>
                                </div>
                                <div className={styles.WebOfficeBtn}>
                                    <button className={styles.WebOfficeBtn}>立即使用</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        );
    }
}

export default Homepage;
