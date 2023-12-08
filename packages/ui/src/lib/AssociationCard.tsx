'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

type AssociationCardProps = {
  id: string;
  name: string;
  description: string;
  url: string;
  link: string;
  visit_website: string;
};

export default function AssociationsCard(props: AssociationCardProps) {
  return (
    <Card sx={{ marginTop: '40px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.url}
          alt={props.name + ' logo'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.location.href = props.link;
          }}
        >
          {props.visit_website}
        </Button>
      </CardActions>
    </Card>
  );
}
