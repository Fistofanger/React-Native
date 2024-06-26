import styled from 'styled-components/native';

const CardView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const CardImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

const CardTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

const CardDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

const truncateTitle = (str: string) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }

  return str;
};

type Props = {
  title: string;
  image: string;
  createdAt: string;
};

export const CardPage = ({title, image, createdAt}: Props) => {
  return (
    <CardView>
      <CardImage source={{uri: image}} />
      <CardDetails>
        <CardTitle>{truncateTitle(title)}</CardTitle>
        <PostDate>
          {createdAt.slice(0, 10).split('-').reverse().join('.')}
        </PostDate>
      </CardDetails>
    </CardView>
  );
};
