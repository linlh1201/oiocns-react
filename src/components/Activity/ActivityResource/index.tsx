import React from 'react';
import { Image } from 'antd';
import { FileItemShare } from '@/ts/base/model';
import { shareOpenLink } from '@/utils/tools';
import { FileUnknownOutlined } from '@ant-design/icons';
import { command } from '@/ts/base';
const ActivityResource = (
  fileList: FileItemShare[],
  maxWidth: number,
  columns: number = 3,
) => {
  if (fileList.length < 1) return <></>;
  const computedSize = () => {
    if (fileList.length >= columns) {
      return maxWidth / columns - 8;
    } else if (fileList.length > 1) {
      return maxWidth / fileList.length - 8;
    }
    return maxWidth - 8;
  };
  const renderResource = (item: FileItemShare) => {
    if (item.contentType?.startsWith('image')) {
      return (
        <div
          key={item.shareLink}
          style={{
            width: computedSize(),
            height: computedSize(),
          }}>
          <Image
            width={'100%'}
            height={'100%'}
            src={shareOpenLink(item.shareLink)}
            preview={{
              src: shareOpenLink(item.shareLink),
            }}></Image>
        </div>
      );
    }
    if (item.contentType?.startsWith('video')) {
      return (
        <div
          key={item.shareLink}
          title={`点击播放${item.name}`}
          style={{
            cursor: 'pointer',
            width: computedSize(),
            height: computedSize(),
          }}>
          <Image
            width={'100%'}
            height={'100%'}
            onClick={() => {
              command.emitter('executor', 'open', item);
            }}
            preview={false}
            src={item.thumbnail}
          />
        </div>
      );
    }
    if (item.contentType?.includes('pdf') || item.contentType?.startsWith('text')) {
      return (
        <iframe
          width={maxWidth}
          height={maxWidth}
          loading="eager"
          name={item.name}
          src={shareOpenLink(item.shareLink)}
        />
      );
    }
    return (
      <FileUnknownOutlined style={{ width: computedSize(), height: computedSize() }} />
    );
  };
  return fileList.map((item) => renderResource(item));
};

export default ActivityResource;