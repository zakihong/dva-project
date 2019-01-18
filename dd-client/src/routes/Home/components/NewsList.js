import React from 'react';
import { Icon } from 'antd';
import styles from './HomeContainer.less';
import { Layout } from 'components';
import classNames from 'classnames';

const { layout } = Layout;
function NewsList() {
  const newsList = () => {
    return [
      {
        title: '美国何时成为“世界警察”？其秘诀是啥？',
        content: '与此同时，伴随着经济的发展，美国的军事实力以“爆炸方式”迅速崛起。到战争结束时，美国不仅拥有一支1200…'
      },
      {
        title: '双11十年，阿里和中国都需要再转身',
        content: '在张勇推出第一个“双11”的时候，中国正在迎接一场席卷全球的经济危机。起源于2008年美国次贷危机的全球金融…'
      }
    ];
  };

  const hotNews = () => {
    return [
      {
        author: '王小萌',
        title: '绝不能放任狗主人嚣张跋扈打人的底气'
      },
      {
        author: '洪小呆',
        title: '自媒体整治的靶子应该指向哪里？'
      },
      {
        author: '王小萌',
        title: '绝不能放任狗主人嚣张跋扈打人的底气'
      },
      {
        author: '王小萌',
        title: '绝不能放任狗主人嚣张跋扈打人的底气'
      }
    ];
  };

  return (
    <div className={styles['news-box']}>
      <div className={styles['recommend-news']}>
        {newsList().map((Item, i) => {
          return (
            <div className={styles['news']} key={i}>
              <div className={styles['title']}>
                <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#cc2b00' }} />
                <span>{Item.title}</span>
              </div>
              <div className={styles['news-content']}>{Item.content}</div>
            </div>
          );
        })}
      </div>
      <ul className={styles['hot-news']}>
        {hotNews().map((Item, i) => {
          return (
            <li key={i}>
              <Icon type="star" theme="filled" style={{ fontSize: '14px', color: '#ff2a00' }} />
              <div className={styles.news}>
                <span className={styles['author']}>{Item.author}</span>
                <span className={styles['title']}>{Item.title}</span>
                <span className={classNames(layout['hidden-xs'], layout['hidden-sm'], styles['time'])}>2018-11-01 08:20</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

NewsList.propTypes = {};

export default NewsList;
