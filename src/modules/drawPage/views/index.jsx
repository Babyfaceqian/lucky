import React, { useState, useEffect } from 'react';
import styles from './index.less';
import * as Fetch from '../apis';
import { message, Row, Col, Select, Button, Modal } from 'antd';
import Background from '../../../components/background';
let nameList = [];
export default () => {
  const [template, setTemplate] = useState({});
  const [list, setList] = useState([]);
  const [type, setType] = useState('');
  const [prize, setPrize] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const fetchTemplate = () => {
    Fetch.getTemplate().then(res => {
      if (res && res.success) {
        setTemplate(res.data);
      }
    })
  }
  const fetchNameList = () => {
    Fetch.getNameList().then(res => {
      if (res && res.success) {
        nameList = res.data;
        setList(res.data);
      }
    })
  }
  const fetchUpload = (param) => {
    Fetch.upload(param).then(res => {
      if (res && res.success) {

      }
    })
  }
  const handleTypeChange = (value) => {
    setType(value);
    setPrize('');
  }
  const handlePrizeChange = (value) => {
    setPrize(value);
  }
  const pushOneName = () => {
    let len = nameList.length;
    if (len === 0) return '';
    let index = parseInt((Math.random() * len));
    let name = nameList.splice(index, 1);
    console.log('name', name);
    return name;
  }
  const pushNameByCount = (count) => {
    let names = [];
    for (let i = 0; i < count; i++) {
      names = names.concat(pushOneName());
    }
    return names.filter(d => !!d);
  }
  const draw = () => {
    let temp = JSON.parse(JSON.stringify(template));
    let tempPrize = temp[type][prize];
    tempPrize.list.forEach(d => {
      d.names = pushNameByCount(d.count);
    });
    tempPrize.done = true;
    setTemplate(temp);
    fetchUpload({ template: temp, nameList });
  }
  const startDraw = () => {
    setIsDrawing(true);
  }
  const stopDraw = () => {
    setIsDrawing(false);
    draw();
  }
  const handleReset = () => {
    Modal.confirm({
      title: '确定要重置？',
      onOk: () => {
        Fetch.reset().then(res => {
          if (res && res.success) {
            message.success('重置成功');
            fetchTemplate();
            fetchNameList();
            setType('');
            setPrize('');
            setIsDrawing(false);
          }
        })
      },
      okText: '确定',
      cancelText: '取消'
    })
  }

  useEffect(() => {
    fetchTemplate();
    fetchNameList();
  }, [])
  console.log('template', template, nameList)
  let currentPrize = (template[type] || {})[prize] || { done: false, list: [] };
  return (
    <div className={styles.drawPage}>
      <Background list={list} animate={isDrawing} />
      <Row className={styles.title}>
        2019年度财务体系年会抽奖
      </Row>
      <Row className={styles.actionBar}>
        <Col md={2} className={styles.selectLabel}>
          类型：
        </Col>
        <Col md={4}>
          <Select className={styles.select} onChange={handleTypeChange} value={type}>
            {
              Object.keys(template).map(key => {
                return (
                  <Select.Option key={key}>{key}</Select.Option>
                )
              })
            }
          </Select>
        </Col>
        <Col md={2} className={styles.selectLabel}>
          奖项：
        </Col>
        <Col md={4}>
          <Select className={styles.select} onChange={handlePrizeChange} value={prize}>
            {
              Object.keys(template[type] || {}).map(key => {
                return (
                  <Select.Option key={key}>{key}</Select.Option>
                )
              })
            }
          </Select>
        </Col>
        {!currentPrize.done && type && prize && <Col md={6} offset={4}>
          {isDrawing ? <Button type="primary" onClick={stopDraw}>停止</Button> : <Button type="primary" onClick={startDraw}>开始抽奖</Button>}
        </Col>}
      </Row>
      {type && prize && <Row className={styles.result}>
        <Col md={4} className={styles.resultLabel}>
          <div>奖品</div>
          <div>中奖人</div>
        </Col>
        <Col md={18} className={styles.resultContent}>
          {
            currentPrize.list.map(d => {
              return <div className={styles.awards}>
                <div className={styles.awardsName}>{d.awards} * {d.count}</div>
                {
                  (d.names || []).map((name, i) => {
                    return (
                      <div key={i} className={styles.luckyName}>{name}</div>
                    )
                  })
                }
              </div>
            })
          }
        </Col>
      </Row>}
      <div className={styles.reset} onClick={handleReset}>重置</div>
    </div>
  )
}