import { Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';

const RenderCampsite = ({ campsite, isFavorite, markFavorite }) => {

    if(campsite){
        return (
            <Card containerStyle={styles.cardContainer}>
                <Card.Image source={{ uri: baseUrl + campsite.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}> 
                        <Text style={{color: 'white',textAlign: 'center',fontSize: 20}}>
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {campsite.description}
                </Text>
                <Icon
                    name={isFavorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => isFavorite ? console.log("Already favorited") : markFavorite()}
                />
            </Card>
        )
    }   
    return <View />;
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    }
});

export default RenderCampsite;