import { Box, Typography, Link } from '@mui/material';
import PageHeader from "@/app/page-header";
import PageContainer from '@/app/page-container';
import PageNavigation from '../app/page-navigation';


const AboutPage = () => {

    return (
        <Box>
            <PageNavigation />

            <PageContainer padding={2}>

                <PageHeader title="About" />

                <Typography>
                    This application pulls data from the High Resolution Rapid Refresh (HRRR)
                    and North American Model (NAM) weather models for analysis.
                </Typography>



            </PageContainer>
        </Box>
    )
};

export default AboutPage;