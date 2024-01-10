import { IActivity } from "../../../../models/Activity";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivityListItem from "./ActivityListItem";

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
              <ActivityListItem activity={activity} key={index} />
            ))}
         
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
