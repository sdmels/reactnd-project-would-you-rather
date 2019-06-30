import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PlusIcon from '@material-ui/icons/Add';

// Misc
import history from './../utils/history';
import routes from './../utils/routes';
import AuthorData from './AuthorData';

const styles = {
  card: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

function QuestionListItem(props) {
  const { classes, users, question } = props;

  const {
    id,
    author,
    timestamp,
    optionOne,
    optionTwo,
  } = question;

  const handleQuestionDetail = () => (
    history.push({
      pathname: `${routes.questions}/${id}`,
    })
  );

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card className={classes.card}>
        <CardContent>
          <AuthorData
            author={users[author]}
            timestamp={timestamp}
          />
          <Typography component="p" align="center">
            &quot;{ optionOne.text }&quot;
            or
            &quot;{ optionTwo.text }&quot;
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={handleQuestionDetail}
          >
            <PlusIcon /> More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

QuestionListItem.propTypes = {
  users: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  question: PropTypes.shape().isRequired,
};

export default withStyles(styles)(QuestionListItem);
