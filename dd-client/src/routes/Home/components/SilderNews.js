import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './HomeContainer.less';
import Slider from 'react-slick';
import classNames from 'classnames';
function SilderNews({ silderNews, silderIndex, showNewsDetail }) {
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

  function handleEnter(i) {
    showNewsDetail(i);
  }

  return (
    <div>
      <Slider {...settings}>
        {silderNews.map((Item, i) => {
          return (
            <div key={i} className={styles['silder-item']} onMouseEnter={handleEnter.bind(this, i)} onMouseLeave={handleEnter.bind(this, '')}>
              <img src={Item.src} alt="" />
              <div className={classNames(styles['detail'], { [styles.show]: silderIndex === i })}>
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
  silderNews: PropTypes.array,
  showNewsDetail: PropTypes.func
};

export default connect()(SilderNews);
