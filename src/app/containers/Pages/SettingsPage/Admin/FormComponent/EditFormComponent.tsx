import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper } from './styles';

type FormData = {
  name: string;
};

interface IProps {
  dataItem?: any;
}

const EditFormComponent: React.FC<IProps> = (props: IProps) => {
  const [item, setItem] = React.useState<any>({ name: props.dataItem ? props.dataItem.name : '' });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(({ name }) => {
    console.log(name);
  }); // firstName and lastName will have correct type
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <label>First Name</label>
        <input {...register('name')} />
        <input type="submit" />
      </form>
    </Wrapper>
  );
};

export default React.memo(EditFormComponent);
