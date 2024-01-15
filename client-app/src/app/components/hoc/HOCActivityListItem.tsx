import { useNavigate } from "react-router";
import { IActivity } from "../../models/Activity";

interface Props {
  render: (onViewClick: () => void, activity: IActivity) => JSX.Element;
  activity: IActivity;
}

const HOCActivityListItem = ({ render, activity }: Props) => {
  const navigate = useNavigate();

  function handleViewClick() {
    navigate(`/activities/${activity.id}`);
  }

  return <>{render(handleViewClick, activity)}</>;
};

export default HOCActivityListItem;
