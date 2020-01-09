import React, { useState, useEffect } from 'react';
import styles from './index.less';
const fontSizeMap = [12, 16, 20, 24];
const colorMap = ['#14D100', '#00A383', '#5ED1BA', '#B6F63E'];
let interval;
export default (props) => {
  const { list = [], animate } = props;
  const [indexes, setIndexes] = useState([]);
  const [items, setItems] = useState([]);
  const getIndexesByCount = (count, len) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      let index = parseInt(Math.random() * len);
      arr[index] = true;
    }
    return arr;
  }
  useEffect(() => {
    clearInterval(interval);
    console.log('animate', animate)
    if (animate) {
      let len = list.length;
      interval = setInterval(() => {
        setIndexes(getIndexesByCount(20, len));
      }, 300)
    } else {
      setIndexes([]);
    }
    return () => {
      clearInterval(interval);
    }
  }, [animate])
  useEffect(() => {
    if (list.length > 0) {
      let items = list.map(d => {
        let top = parseInt(Math.random() * (document.body.clientHeight - 50));
        let left = parseInt(Math.random() * (document.body.clientWidth - 150));
        let color = colorMap[parseInt(Math.random() * colorMap.length)];
        let fontSize = fontSizeMap[parseInt(Math.random() * fontSizeMap.length)];
        return {
          text: d,
          top,
          left,
          color,
          fontSize
        }
      });
      setItems(items);
    }
  }, [list])
  return (
    <div className={styles.backgroud}>
      {
        items.map((d, i) => {
          let textShadow = indexes[i] ? `0 0 4px ${d.color}` : 'none';
          let opacity = indexes[i] ? 0.6 : 0.1;
          return (
            <div key={i} className={styles.item} style={{ top: d.top, left: d.left, fontSize:d.fontSize, color: d.color, opacity, textShadow }}>
              {d.text}
            </div>
          )
        })
      }
    </div>
  )
}