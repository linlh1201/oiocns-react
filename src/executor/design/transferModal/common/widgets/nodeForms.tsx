import { generateUuid } from '@/ts/base/common';
import { ITransfer } from '@/ts/core';
import React, { useEffect, useState } from 'react';
import { EnvironmentForm } from './forms/environmentForm';
import { SubTransferForm } from './forms/subTransferForm';
import { StoreForm } from './forms/storeForm';
import { RequestForm } from './forms/requestForm';
import { MappingForm } from './forms/mappingForm';
import { ExcelForm } from './forms/excelForm';
import { EnterForm } from './forms/enterForm';

interface IProps {
  current: ITransfer;
}

export const NodeForms: React.FC<IProps> = ({ current }) => {
  const [entities, setEntities] = useState<{ [key: string]: any }>({});
  const [commands, setCommands] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const id = current.command.subscribe((type, cmd, args) => {
      if (type != 'tools') return;
      switch (cmd) {
        case 'newEnvironment':
          setEntities({ ...entities, [current.id]: undefined });
          setCommands({ ...commands, [current.id]: cmd });
          break;
        case 'updateEnvironment':
          setEntities({ ...entities, [args.id]: args });
          setCommands({ ...commands, [args.id]: cmd });
          break;
        case 'update': {
          setEntities({ ...entities, [args.id]: args });
          let mapping: { [key: string]: string } = {
            请求: 'updateRequest',
            表单: 'updateForm',
            子图: 'updateTransfer',
            脚本: 'updateExecutable',
            映射: 'updateMapping',
            选择: 'updateSelection',
            环境: 'updateEnvironment',
            存储: 'updateStore',
            表格: 'updateTable',
            事项配置: 'updateWorkConfig',
            实体配置: 'updateThingConfig',
          };
          setCommands({ ...commands, [args.id]: mapping[args.typeName] });
          break;
        }
      }
    });
    return () => {
      current.command.unsubscribe(id);
    };
  });
  const finished = (args: [string, any]) => {
    const [id, data] = args;
    if (id) {
      remove(id);
      current.command.emitter('node', 'update', data);
    }
  };
  const remove = (id?: string) => {
    if (id) {
      delete entities[id];
      delete commands[id];
      setEntities({ ...entities });
      setCommands({ ...commands });
    }
  };
  return (
    <>
      {Object.entries(entities).map((entry) => {
        switch (commands[entry[0]]) {
          case 'newEnvironment':
          case 'updateEnvironment':
            return (
              <EnvironmentForm
                key={generateUuid()}
                formType={commands[entry[0]]}
                transfer={current}
                current={entry[1]}
                finished={() => {
                  remove(entry[0]);
                  current.command.emitter('environments', 'refresh');
                }}
              />
            );
          case 'updateRequest':
            return (
              <RequestForm
                key={generateUuid()}
                transfer={current}
                current={entry[1]}
                finished={() => finished(entry)}
              />
            );
          case 'updateMapping':
            return (
              <MappingForm
                key={generateUuid()}
                transfer={current}
                current={entry[1]}
                finished={() => finished(entry)}
              />
            );
          case 'updateStore':
            return (
              <StoreForm
                key={generateUuid()}
                transfer={current}
                current={entry[1]}
                finished={() => finished(entry)}
              />
            );
          case 'updateTransfer':
            return (
              <SubTransferForm
                key={generateUuid()}
                transfer={current}
                current={entry[1]}
                finished={() => finished(entry)}
              />
            );
          case 'updateTable':
            return (
              <ExcelForm
                key={generateUuid()}
                transfer={current}
                current={entry[1]}
                finished={() => finished(entry)}
              />
            );
          case 'updateForm':
            return (
              <EnterForm
                key={generateUuid()}
                transfer={current}
                current={entry[1]}
                finished={() => finished(entry)}
              />
            );
        }
      })}
    </>
  );
};
