
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import Grid from '@material-ui/core/Grid';
import QuestionListItem from './QuestionListItem';

function QuestionList({ users, questions }) {
  if (isEmpty(questions)) {
    return <p>There are no more questions!</p>;
  }

  return (
    <Grid container spacing={6}>
      {questions.map(question => (
        <QuestionListItem
          key={question.id}
          users={users}
          question={question}
        />
      ))}
    </Grid>
  );
}

QuestionList.propTypes = {
  users: PropTypes.shape().isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default QuestionList;
