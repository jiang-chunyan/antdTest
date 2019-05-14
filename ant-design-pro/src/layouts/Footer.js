import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '帮助',
          title: '帮助',
          href: 'http://www.yozodcs.com/userItems.html',
          blankTarget: true,
        },
        {
          key: '隐私',
          title: '隐私',
          href: 'http://www.yozodcs.com/privacy.html',
          blankTarget: true,
        },
        {
          key: '条款',
          title: '条款',
          href: 'http://www.yozodcs.com/term1.html',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          <Icon type="copyright" /> 永中软件股份有限公司 苏ICP备10095690号-5
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
