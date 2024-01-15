import { IActivity } from "../../../../models/Activity";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivityListItem from "./ActivityListItem";
import HOCActivityListItem from "../../../../components/hoc/HOCActivityListItem";

const ActivityList = () => {
  
  const { activityStore: { groupActivities } } = useStore();

  return (
    <>
      {groupActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
            {activities.map((activity: IActivity, index: number) => (
              <HOCActivityListItem
                key={index}
                activity={activity} 
                render={(onViewClick,act) => (
                  <ActivityListItem 
                    activity={act} 
                    onViewClick={onViewClick} />
                )}/>

              
            ))}
         
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
