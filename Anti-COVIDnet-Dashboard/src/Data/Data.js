import img1 from '../Assets/1.png'
import img2 from '../Assets/2.png'
import img3 from '../Assets/3.png'
import img5 from '../Assets/city_wise.png'
import img6 from '../Assets/Extracted_Images.png'

export default {
    useCase: [
        { imageUrl: img3, title: "Detect people on the streets and track them" },
        { imageUrl: img1, title: "Analyse the distance between them to flag them" },
        { imageUrl: img6, title: "Extract their images if they do not follow the social distancing norms" },
        { imageUrl: img2, title: "Provides an option to enhance the images and upload them to a cloud database" },
        { imageUrl: img5, title: "Process the data uploaded from multiple places and provide graphical analysis." },

    ]
}