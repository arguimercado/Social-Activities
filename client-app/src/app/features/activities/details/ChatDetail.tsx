import { Header, Segment, Comment, Loader } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";

interface Props {
   activityId: string;
}

const ChatDetail = ({ activityId }: Props) => {
   const { commentStore } = useStore();

   useEffect(() => {
      if (activityId) commentStore.createHubConnection(activityId);

      return () => {
         commentStore.clearComments();
      };
   }, [commentStore, activityId]);

   return (
      <>
       
         <Segment
            textAlign="center"
            attached="top"
            inverted
            color="teal"
            style={{ border: "none" }}
         >
            <Header>Chat about this event</Header>
         </Segment>
        
         <Segment attached clearing>
         <Formik
            onSubmit={(values, { resetForm }) =>
               commentStore.addComment(values).then(() => resetForm())
            }
            initialValues={{ body: "" }}
            validationSchema={Yup.object({
               body: Yup.string().required(),
            })}
         >
            {({ isSubmitting, handleSubmit, isValid }) => (
               <Form className="ui form" onSubmit={handleSubmit}>
                  <Field name="body">
                     {(props: FieldProps) => (
                        <div style={{ position: "relative" }}>
                           <Loader active={isSubmitting} />
                           <textarea
                              rows={2}
                              {...props.field}
                              placeholder="Enter your comment (Enter to submit,Shift + Enter for new line)"
                              onKeyDown={(e) => {
                                 if (e.key === "Enter" && e.shiftKey) {
                                    return;
                                 } else if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    isValid && handleSubmit();
                                 }
                              }}
                           />
                        </div>
                     )}
                  </Field>
               </Form>
            )}
         </Formik>
            <Comment.Group>
               {commentStore.comments.map((comment) => (
                  <Comment key={comment.id}>
                     <Comment.Avatar
                        src={comment.image || "/assets/user.png"}
                     />
                     <Comment.Content>
                        <Comment.Author as="a">
                           {comment.displayname}
                        </Comment.Author>
                        <Comment.Metadata>
                           <div>
                              {formatDistanceToNow(comment.createdAt)} ago
                           </div>
                        </Comment.Metadata>
                        <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                           {comment.body}
                        </Comment.Text>
                     </Comment.Content>
                  </Comment>
               ))}
            </Comment.Group>
         </Segment>
      </>
   );
};

export default observer(ChatDetail);
