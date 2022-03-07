# Paw Print
<img src='images/paw_print.png' width=200/>


# Project Overview
This project aims to create a model that can accurately predict a dog's breed given an image. Additionally it will output the top 5 breed predictions and the breed traits (including temperament, size, energy level, trainability, etc) of the predicted breed.

Using Tensorflow's Pre-Trained Convolutional Neural Networks we were able to produce a model that had a prediction accuracy of 78%. With further analysis we have determined that, 94% of the time, our model will classify an image as the correct breed within the top 5 predictions.


# Business Understanding
Every year over 3 million dogs end up in animal shelters. A study done in 2013 showed that shelter staff correctly visually identify breeds 67% of the time, and that accuracy was exponentially lower for dogs that are mixed breeds. Additionally the number one question asked by people looking for dogs in a shelter is "what breed is that dog?". Creating a model that can predict a dogs breed given an image can be extremely useful for accurately classifying animals at animal shelters. Additionally,  an accurate breed prediction and corresponding breed traits has the potential to lead to a higher rate of dog adoptions within shelters, which could save thousands of dogs lives every year. 

Examples of types of visual identification that animal shelters use to classify dogs:
- Color
- Size
- Fur length
- Distinguishable features/markings (ex: Rhodesian Ridgebacks have a ridge of fur going in the oposite direction on their backs)
- Ears: Floppy or upright

Overall, creating a CNN model that can predict a dogs breed can be immensely useful for animal shelters to save time and resources, increase identification accuracy, and potentially lead to an increase in dog adoptions.


# Data Understanding
AKC Dog Breed Traits: This dataset contains dog breed traits (temperament, height, weight, trainability, energy level, etc) for 277 dog breeds. This dataset comes from https://github.com/tmfilho/akcdata and has been pre-processed in the [dog_breed_preprocessing.ipynb](https://github.com/hannah-schurman/dog-breed-identification/blob/main/dog_breed_preprocessing.ipynb) notebook so that the dog breed labels are compatible with those from our images. 

Dog Breed Images and Labels: This dataset contains 10,222 images of dogs from 120 different breeds, along with a dataframe containing each image name and their corresponding breed. This dataset comes from Kaggle https://www.kaggle.com/c/dog-breed-identification.

Note: Image data has been removed from the repository due to folder size. Image data is downloadable from the Kaggle link above. 
For reproducability: images should be stored in a folder with a file path: 'data/dog-breed-identification/train/'


# Modeling
Step 1: Preprocess AKC Breed labels/traits. The dog_breed_preprocessing.ipynb notebook carries out preprocessing steps to ensure that breed labels within the Image dataset and labels within the AKC dataset match up. This involved a significant amount of string formatting. 

Step 2: Process images for modeling. This involved reshaping images and performing data augmentation on the images to increase training data. (Below is an example of data augmentation, specifically using the parameter 'rotational_range'=15)<br>
<img src='images/augment.png'/>

Step 3: Model evaluation. We used pre-trained Convolutional Neural Networks and took an iterative approach to find the best performing model on train, validation, and test images. 

    1. Began with a baseline MobileNetV2 model which gave us an average of 60% accuracy.
    2. In attemps to increase our accuracy score, we tuned our MobileNetV2 model using GlobalAveragePooling and Dropout, which increated our score to an average of 70%
    3. We then used the MobileNetV2 model from Tensorflow Hub which resulted in an average of 78% accuracy
    4. We also tried another pre-trained model InceptionResNetV2 which increased our score to an average of 80% accuracy - but we chose to stick with the MobileNetV2 because of it's speed. Additionally it was able to predict corrreclty but had much lower prediction percentages (MobileNetV2 would predict a Husky at 92%, and then InceptionResNetV2 would predict it correctly, but only at 23%) 


# Final Evaluation
As stated above we decided to go with a MobileNetV2 model because it performs faster and takes up less space and showed to have really high accuracy scores compared to any other models we tried. It is also better used in Mobile App's. <br>
<br>
The following figure shows a confusion matrix for our model's predictions on our test holdout images<br>
<img src='images/confusion.png'/>
<br>
Below is an example of how our model would perform given a single image as input<br>
<img src='images/prediction.png'/>
<br>
We then took the top 5 predictions and filled the bar in green if any of those 5 predictions were accurate<br>
<img src='images/top_predictions.png'/>
<br>
We then got breed traits from the AKC Breed dataframe<br>
These traits show Breed, Breed Group, Temperament, Popularity, Avg Height, Avg Weight, and Energy level<br>
<img src='images/breed_traits.png'/>
<br>
Our final evaluation function also plotted example images of the top 5 breed predictions.
<img src='images/top_5.png'/>


# Mobile Application
In addition to the modeling and evaluation carried out in the jupyter notebooks, this repository also contains the work done to create a mobile app for dog breed prediction. This mobile app takes input from either your phone camera or library and will predict the dog's breed as well as output the corresponding personality traits. For more information regarding the Mobile Application and how to use it, see the README.md within the [mobile_app/dog-identification](https://github.com/hannah-schurman/dog-breed-identification/tree/main/mobile_app/dog-identification) folder.

<img src='images/welcome.PNG' width=200/><br>
<img src='images/input.PNG' width=200/>
<img src='images/prediction_app.PNG' width=200/>


# Conclusion
We have created a model that will predict a dog's breed with an accuracy of 78%. Further analysis shows that our model was actually able to classify the correct breed within the top 5 predictions at a 94% accuracy rate. We can conclude that our final model's 78% accuracy is an improvement over the current 67% accuracy of shelter's visual identification.

To guarantee best results, we recommend the input image be good lighting, without any image noise, and presents any distinguishable features of the dog. While testing out images, these types of images had a much higher success rate for being accurately classified. Similarly this model performed much better on images of dogs that are purebred, but still maintained some accuracy for dogs that are mixed-breeds. For best classification results, we would still recommend that breed DNA tests will give a more accurate results that any visual identification. 


# Next Steps
Given more time and resources I would love to collect more training data so to work towards increasing our models accuracy and decreasing our overfitting. 

While our model has performed relatively well on being able to accurately classify 120 dog breeds, for this model to be the most useful for animal shelters it will have to improve accuracy on any mixed-breed dogs, since more often dogs in shelters are mixed-breed and not purebred.

# Further Questions
See the full analysis in the [Jupyter Notebook](https://github.com/hannah-schurman/dog-breed-identification/blob/main/dog_breed_classifier.ipynb) or review [this presentation]()

For information regarding the mobile application, navigate to the README.md inside the [mobile_app/dog-identification](https://github.com/hannah-schurman/dog-breed-identification/tree/main/mobile_app/dog-identification) folder. 

For any additional questions, please contact Hannah Schurman at [hannah.schurman1@gmail.com](hannah.schurman1@gmail.com)


# Repository
```
├── data                         # contains original datasets and saved models
│   ├── akc_breeds               # csv file containing breed information for 277 known AKC breeds
│   ├── akc_breeds_final         # pre-processed final version of akc_breeds csv file - cleaned up for easy use with image labels
│   ├── dog-breed-identification # folder containing train images
│   │   ├──labels.csv            # csv file containing filenames and corresponding breed labels for each image
│   │   ├──train                 # folder containing images of dogs for training model - put in .gitignore because of folder size
│   ├── test_dogs                # folder containing test images of friends dogs to test on model
│   ├── models                   # Saved tensorflow model and tensorflow.js data
├── images                       
├── README.md
├── mobile_app
│   ├── dog-identification       # folder containing necesary files for making the mobile app
├── dog_breed_classier.ipynb
├── dog_breed_preprocessing.ipynb
└── dog_breed_classier.pdf
```
