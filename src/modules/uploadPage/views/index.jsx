import React, { useState, useEffect } from 'react';
import styles from './index.less';
import * as Fetch from '../apis';
import { message, Input, Row, Col } from 'antd';
import XLSX from 'xlsx';
import _ from 'lodash';
export default () => {
  const [templateHtml, setTemplateHtml] = useState('')
  const [nameListHtml, setNameListHtml] = useState('')
  const fetchUpload = (param) => {
    Fetch.upload(param).then(res => {
      if (res && res.success) {
        message.success('上传成功');
      }
    })
  }
  const handleFileChange = (e) => {
    let files = e.target.files, f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      console.log('e.target.result', e.target.result)
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: 'array' });
      let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

      data = data.filter(d => d.length > 0);
      let first_temp_worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
      let templateHtml = XLSX.utils.sheet_to_html(first_temp_worksheet);
      setTemplateHtml(templateHtml);

      data.shift();
      let obj = {};
      data.forEach(d => {
        let type = d[0];
        let prize = d[1];
        let awards = d[2];
        let count = d[3];
        if (!obj[type]) obj[type] = {};
        if (!obj[type][prize]) obj[type][prize] = {
          done: false,
          list: []
        };
        obj[type][prize].list.push({
          awards,
          count
        })
      })
      let second_worksheet = workbook.Sheets[workbook.SheetNames[1]];
      data = XLSX.utils.sheet_to_json(second_worksheet, { header: 1 });

      data = data.filter(d => d.length > 0);
      let second_temp_worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
      let nameListHtml = XLSX.utils.sheet_to_html(second_temp_worksheet);
      setNameListHtml(nameListHtml);
      data.shift();
      data = _.uniq(_.flatten(data));
      fetchUpload({ template: obj, nameList: data, initial: true, templateHtml, nameListHtml });
    };
    reader.readAsArrayBuffer(f);
  }
  useEffect(() => {
    Fetch.getHtml().then(res => {
      if (res && res.success) {
        setTemplateHtml(res.data.templateHtml);
        setNameListHtml(res.data.nameListHtml);
      }
    })
  }, [])
  return (
    <div className={styles.uploadPage}>
      <Row className={styles.label}>
        点击上传文件：
      </Row>
      <Row>
        <input type="file" onChange={handleFileChange} />
      </Row>
      <Row className={styles.label}>
        当前使用模板：
      </Row>
      <Row>
        <Col md={12}>
          <div className={styles.tableWrapper} dangerouslySetInnerHTML={{ __html: templateHtml }}></div>
        </Col>
        <Col md={12}>
          <div className={styles.tableWrapper} dangerouslySetInnerHTML={{ __html: nameListHtml }}></div>
        </Col>
      </Row>

    </div>
  )
}