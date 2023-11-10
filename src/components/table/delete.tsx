import useDelete from '@/hooks/useDelete';
import { Context } from '@/settings/constant';
import { ActionType, AlertType, IReactProps } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';

type TParm = {
  table: string;
  data: any;
  update: () => void;
};

const Delete = memo(({ children, table, data, update }: IReactProps & TParm) => {
  const [, setContext] = useContext(Context);
  const [respond, getDelete] = useDelete();

  useEffect(() => {
    if (respond) {
      let type = AlertType.Error;
      if (respond.res) {
        type = AlertType.Success;
        update();
      }
      setContext({ type: ActionType.Alert, state: { enabled: true, body: respond.msg, type } });
    }
  }, [respond]);

  return (
    <button
      onClick={() => {
        const { _id } = data;
        if (_id) {
          const currentData = { _id };
          getDelete({ table, data: currentData });
        }
      }}
      className='btn btn-xs btn-warning'
    >
      {children}
    </button>
  );
});
export default Delete;