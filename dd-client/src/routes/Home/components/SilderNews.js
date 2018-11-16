import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './HomeContainer.less';
import Slider from 'react-slick';
import classNames from 'classnames';
function SilderNews({ active, showNewsDetail }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'silder-news'
  };
  const newsList = () => {
    return [
      {
        title: 'Dream is dieing',
        url: '#ss',
        src: require('assets/news/m1.jpg')
      },
      {
        title: '后悔无期',
        url: '#ss',
        src: require('assets/news/m2.jpg')
      },
      {
        title: '你是唯一',
        url: '#ss',
        src: require('assets/news/m3.jpg')
      },
      {
        title: '一代宗师',
        url: '#ss',
        src: require('assets/news/m4.jpeg')
      },
      {
        title: '大护法',
        url: '#ss',
        src: require('assets/news/m5.jpg')
      }
    ];
  };

  function handleEnter(i) {
    showNewsDetail(i);
  }

  return (
    <div>
      <Slider {...settings}>
        {newsList().map((Item, i) => {
          return (
            <div key={i} className={styles['silder-item']} onMouseEnter={handleEnter.bind(this, i)} onMouseLeave={handleEnter.bind(this, '')}>
              <img src={Item.src} alt="" />
              <div className={classNames(styles['detail'], { [styles.show]: active === i })}>
                <h3>{Item.title}</h3>
                <div className={styles['content']}>这个电影十分的感人，感人的不得了。看哭了都…………</div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
SilderNews.propTypes = {
  showNewsDetail: PropTypes.func
};

const mapStateToProps = state => {
  return {
    active: state.index.activeNews
  };
};

const mapDispatchToProps = dispatch => ({
  showNewsDetail: activeNews => {
    dispatch({ type: 'index/showNewsDetail', payload: { activeNews } });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SilderNews);
