import { IActivity } from "../../../models/Activity";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivityItem from "./ActivityItem";

const ActivityList = () => {
  const {
    activityStore: { groupActivities },
  } = useStore();

  return (
    <>
      {groupActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
            {activities.map((activity: IActivity, index: number) => (
              <ActivityItem activity={activity} key={index} />
            ))}
         
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
