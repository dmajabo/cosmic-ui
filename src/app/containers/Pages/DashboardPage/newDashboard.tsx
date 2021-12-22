import React from 'react';
import { Grid, Container, Card, CardHeader, Box } from '@mui/material';
interface Props {}

const Dashboard: React.FC<Props> = (props: Props) => {
  return (
    <div style={{ width: '100%', minHeight: '100%', padding: '40px' }}>
      <Container maxWidth={false}>
        <Grid container spacing={3} columns={6}>
          <Grid item xs={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Tasks" />
                <Box sx={{ px: 3, py: 1 }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Tasks" />
                <Box sx={{ px: 3, py: 1 }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Tasks" />
                <Box sx={{ px: 3, py: 1 }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader title="Tasks" />
              <Box sx={{ px: 3, py: 1 }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default React.memo(Dashboard);
