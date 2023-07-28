const terminalBody = document.getElementById('terminalBody');
const commandInput = document.getElementById('commandInput');

const initCommands = {
    about: `Hello, my name is Braeden Kantz, and I am a quantitative developer. Thank you for visiting my portfolio! This terminal will allow you to easily explore my achievements, skills, and projects to see if I am a suitable candidate for your company or freelance position. This page is designed to complement my resume and portfolio website's landing page and will include much more detailed information. If you have any questions, please refer to the contact command to email, call, or set up a meeting!`,
    skills: `My skillset is, in my opinion, quite unique and very rare to find in the open market. My background is in applied mathematics, specifically in the field of Partial Differential Equations (PDEs) and Computational Finance. During my time at Michigan State University, I became enthralled with the field of computational data science and machine learning. Since taking my first introductory course in Python in 2019, I have since mastered the language as well as a few others to build cutting-edge projects that will be described under the projects command. In addition, I have also become highly proficient in R, SQL, JavaScript, TensorFlow, Keras, PyTorch, scikit-learn, HTML, CSS, and, most importantly, the QuantConnect LEAN API.`,
    projects: `Many of my projects involve machine learning, more specifically reinforcement learning, calculus, statistics, and optimization. I have developed numerous programs that help describe complex mathematical formulas and statistical operations and how they are applied in the real world. Many of these are implemented through trading, given my background in computational finance. My favorite types of models focus around derivatives contracts as they are essentially instruments of calculus and statistics. <br>To learn more about specific projects that I have built and implemented, enter one of the following commands:`,
    contact: `Please feel free to contact me using any of the following methods:<br>Email: <a href="mailto:braedenk73@gmail.com" target="_blank">braedenk73@gmail.com</a><br>Telegram: @bkantz<br>Discord: harmonic_vega<br>Schedule a meeting: <a href="https://calendly.com/braedenk73/30min" target="_blank">Calendly</a>`,
    clear: '',
    education: `I am a recent graduate of Michigan State University with a Bachelor of Science degree in Quantitative Risk Analysis. While Michigan State is not one of the big 3 universities in the U.S., it is well-known as one of the best Natural Science Colleges in the world. My degree is focused on applied mathematics and statistics with a concentration on the financial markets, making my skillset very wide and applicable to many different fields. In combination with my skills in data analytics and programming, I am well-suited for a variety of roles in many different industries, such as finance, insurance, banking, risk analysis, and more. Out of my graduating class of nearly 8,000 students, I am one of 5 other students to graduate from MSU with a Bachelor of Science degree in Quantitative Risk Analysis and achieved the highest GPA of anyone in the program with a GPA of 3.85. I intend to continue my educational career to pursue my Master's Degree in Predictive Analytics at Stanford University when I have the financial means to do so.`,
    experience: `While I lack the traditional industry experience at hedge funds or investment banks for my role, I have developed invaluable experience in the field of quantitative development through both freelance development and the creation of my company, Axiom Finance. Axiom is a startup that I developed when I was 21 years old and is a digital banking platform that utilizes mathematics to optimize how users save and invest their money using optimization algorithms that I developed. The most notable of these algorithms is the Kantz Volatility optimization, which is a variation of the Markowitz portfolio optimization equation that utilizes the prices of long-term at-the-money derivatives contracts to achieve a better understanding of how the market anticipates an asset price to change over long periods of time. This equation has proven to outperform the Markowitz model by up to 12% per annum. I am also a member of the QuantConnect community and have been actively involved in the development of the LEAN API for over a year and have achieved the status of a top 10% contributor.`,
    resume: `My resume is available using this link: <a href='https://drive.google.com/file/d/12ZGPtDVvwb8XudcQUYP4HR1uxPVrza6S/view?usp=sharing' target="_blank">Resume</a>`
  };
  

const projectCommands = {
    derivatives: "<p><strong>HopCat Derivatives</strong></p><p>This project holds a special place as one of my favorite and earliest computer science ventures outside of a classroom assignment. HopCat, the restaurant where I previously worked as a bartender, served as the inspiration for this endeavor. As a data analyst, I diligently tracked my daily tip outs and leveraged this data to predict which shifts yielded the highest average hourly wages.</p><p>One day, I decided to plot a 4-day moving average of my hourly wage. To my surprise, the result exhibited behavior akin to that of a stock or a traded security. Intrigued by this observation, I ventured into creating a financial derivative model, using the 4-day moving average as the underlying asset for put and call options.</p><p>Although this example may initially seem inconsequential, it proved to have fascinating applications. These derivatives could serve as a hedge against an expected decrease in wages or as a speculative tool for a dramatic increase. For instance, if a bartender or waiter had experienced a few shifts with low earnings but anticipated higher wages in the next few shifts, they could purchase a call option to profit from the anticipated increase. Conversely, put options could be employed to hedge against a significant decrease in hourly wages.</p><p>Initially, this project was purely for amusement, but as I started gathering data from my coworkers, it quickly became a fad at our bar to place bets on the performance of other employees based on their past performance and scheduled shifts. It's essential to note that the platform never involved real money transactions. Nonetheless, it served as an excellent tool for visualizing the use case for European-style financial derivatives.</p>",
    axiom: "<p><strong>Axiom Finance</strong></p><p>Axiom Finance stands as perhaps my most notable accomplishment. It represents a digital banking platform that I meticulously developed, leveraging cutting-edge mathematical algorithms to optimize users' savings and investments. The core concept behind the platform is to democratize the benefits of mathematical strategies employed by hedge funds and investment banks for developing and managing portfolios.</p><p>The platform's key innovation lies in an equation I devised and named the Kantz Volatility Optimization equation. This equation represents a variation of the renowned Markowitz Portfolio Optimization, utilizing long-term at-the-money derivatives contract prices to gain profound insights into the market's anticipation of asset price changes over extended periods. Empirical evidence shows that this equation outperforms the traditional Markowitz model by as much as 12% annually, depending on the specific portfolio and timeframe.</p><p>Beyond the Kantz Volatility Optimization, Axiom Finance incorporates various quantitative techniques to effectively manage users' portfolios. These techniques include portfolio rebalancing, strategic hedging, and risk management strategies. The intellectual property associated with this groundbreaking approach has been licensed to a company called Skeleton Technologies, which is actively developing the platform.</p><p>As per the licensing agreement, I am unable to disclose intricate specifics regarding the platform's operation. However, I firmly believe that upon completion, Axiom Finance has the potential to reshape and revolutionize traditional finance and banking sectors.</p>",
    gobot: "<p><strong>Gomoku Reinforcement Learning</strong></p><p>I take immense pride in my creation of a powerful reinforcement learning algorithm designed to play the game of Gomoku. The model employs two distinct reinforcement learners that engage in strategic battles, continually optimizing their gameplay strategies. The entire program is built on efficient array-based simulations of the game board, implementing the intricate game logic of Gomoku.</p><p>The core of this remarkable algorithm lies in its ability to learn from experience. Over a span of rigorous training, it was exposed to an extensive dataset of more than 6 million games. Through these experiences, the reinforcement learners honed their skills and strategies to reach a level of play comparable to that of a grandmaster human player.</p><p>Gomoku, being a complex and challenging board game, demands careful consideration of moves and a deep understanding of the opponent's intentions. My reinforcement learning algorithm showcases its prowess by strategically maneuvering across the virtual board, devising cunning tactics, and adapting dynamically to ever-changing game states.</p><p>With countless hours of training and optimization, this algorithm has become a potent force in the world of Gomoku gaming. It serves as a testament to the immense potential of reinforcement learning and its ability to master complex tasks through experience and self-improvement.</p>",
    blackjack: "<p><strong>Blackjack Reinforcement Learning</strong></p><p>Like many statsticians, I find somce casino games, specfically blackjack, to be a exceptionally intriguing, which lead me to create a reinforcement learning model tailored specifically for playing the game of Blackjack. This remarkable algorithm has been fine-tuned to analyze various game aspects, including the player's hand, the dealer's hand, bet sizes, and the number of decks shuffled into the shoe or the dealer's deck, with the primary objective of computing the probability that the dealer busts.</p><p>The prowess of this reinforcement learner lies in its sophisticated ability to size bets optimally and systematically outperform the dealer. It has been meticulously trained on extensive datasets, learning from countless Blackjack scenarios and refining its strategies over time to achieve an extraordinary win rate.</p><p>What sets the latest iteration of this model apart is its exceptional memory. The algorithm possesses the remarkable capability to remember every card played in the deck, enabling it to make precise and optimal decisions throughout the game. This memory-based approach empowers the bot to seize advantageous opportunities and navigate the game with exceptional finesse.</p><p>In Blackjack, where decisions must be made swiftly and accurately, my reinforcement learning model showcases its prowess by outmaneuvering the dealer and consistently making strategic choices. It is a testament to the immense potential of reinforcement learning in mastering complex tasks, and its application in Blackjack has proven to be a resounding success.</p><p>The extraordinary performance of this model brings a new dimension to Blackjack gameplay, demonstrating the transformative power of reinforcement learning in the realm of casino gaming.</p>",
    quantconnect: '<p><strong>Contributions to QuantConnect</strong></p><p>As a quantitative developer, I take have made significant contributions to the QuantConnect platform, where I have harnessed its potential to develop and test diverse quantitative trading strategies. Over the course of my engagement with the platform, I have crafted an impressive portfolio of over 100 distinct strategies, showcasing a wide array of performance profiles.</p><p>Within the realms of QuantConnect, I have had the opportunity to explore and build a remarkable assortment of trading strategies, each targeting unique market opportunities. These encompass high-frequency trading, statistical arbitrage, options volatility trading, futures leverage strategies, grid trading bots, and dynamic portfolios utilizing specialized filters to curate bespoke indexes for portfolios.</p><p>My proficiency extends to implementing sophisticated trading methodologies, such as protective puts, delta hedging, and automated covered call strategies. Each of these strategies has been crafted with meticulous attention to detail, harnessing the full potential of the QuantConnect platform to achieve optimal performance.</p><p>One of my most noteworthy accomplishments on the platform is my dynamic universe portfolio creation and management strategy, which has earned a place in the esteemed top 10% of contributors for Sharpe ratio. This speaks volumes about the robustness and effectiveness of the strategies I have devised and the rigor with which I approach quantitative trading.</p><p>QuantConnect has proven to be an invaluable playground for my creativity and expertise in the realm of quantitative finance. Through this platform, I have not only honed my skills but also made a profound impact on the world of algorithmic trading. My contributions are a testament to the limitless possibilities that arise when cutting-edge technology meets the intellect of a passionate quant.</p>',
    evolution: "<p><strong>Modeling Evolution with Pygame</strong></p><p>One of my first personal python projects was an intricate simulation, which delves into the fascinating world of evolutionary statistics. This program revolves around a captivating predator-prey model, featuring two distinct species - foxes and rabbits.</p><p>Within this simulation, the animals are not mere passive entities; they move dynamically through the environment using Brownian motion. Each species follows a set of rules that dictate their breeding patterns and feeding behavior, establishing a complex ecosystem rich with interactions.</p><p>One of the highlights of this simulation lies in the animals' genetic makeup. Each individual possesses several genes, profoundly influencing their movement and survival strategies within the environment. When reproducing, these genetic traits are passed on to their offspring with an element of randomness - the chance for mutation.</p><p>Mutations, in this context, serve as a catalyst for the exploration of new survival strategies. Some mutations may drastically enhance an animal's ability to thrive, capturing prey with greater efficiency or avoiding predators with heightened skill. Conversely, other mutations could hinder their chances of survival.</p><p>As the simulation unfolds, the propagation of beneficial mutations becomes evident. Over time, those advantageous genetic traits rapidly spread through the species, fostering remarkable adaptations within the populations. This captivating display demonstrates the power of natural selection and the extraordinary dynamics of evolutionary processes.</p><p>Through the seamless combination of Python, Pygame, and the intricate design of the predator-prey model, this program not only provides an engaging and educational experience but also offers valuable insights into the dynamics of evolution and the interplay between genetic diversity and survival in ever-changing environments.</p>",
    lipreader: "<p><strong>Lipreading Model using TensorFlow and Keras</strong></p><p>I am excited to share my groundbreaking lipreading model, meticulously crafted using the TensorFlow and Keras libraries in Python. This cutting-edge program takes video files as input and harnesses the power of deep learning to unravel the intricacies of lip movements and speech patterns.</p><p>At the core of this sophisticated model lies a transformative process. The video is converted into frames, and each frame undergoes analysis to create a depth map, representing the nuanced lip movements and facial expressions of the person speaking. The model then accurately predicts the words spoken in the video, bringing the fascinating realm of lipreading to life.</p><p>The exceptional sensitivity of this lipreading model is a testament to its precision. While it can process only one person at a time, the trade-off lies in the incredible power it exhibits and the remarkable accuracy it achieves. The model's capability to interpret even subtle lip movements contributes to its high accuracy in deciphering speech, making it a valuable tool in various applications.</p><p>While I cannot claim that I created this model by myself, this model pushes the boundaries of what is possible in the realm of speech recognition and was a fantastic project for learning the intricaies of the TensorFlow and Keras libraries.</p><p>I am immensely proud of this lipreading model, as it represents a fusion of cutting-edge technologies and advanced techniques in machine learning. The strides made in the domain of lipreading have immense potential, and this model serves as a testament to the transformative power of AI in understanding human communication.</p>",
    fourier: "<p><strong>Fourier Transform Drawing Program</strong></p><p>I am thrilled to introduce my innovative drawing program, meticulously crafted using JavaScript, that offers a mesmerizing visualization of the Fourier transform using complex numbers. This program pushes the boundaries of creativity by drawing intricate curves using epicycles, which elegantly move and dance in harmony with trigonometric functions.</p><p>The core of this program revolves around the captivating concept of epicycles, where a series of circular motions combine harmoniously to trace the contours of complex curves. Employing the principles of complex number representation, the Fourier transform serves as a powerful tool in breaking down any continuous curve into its fundamental components.</p><p>The magic unfolds as the program cleverly employs a carefully chosen number of epicycles to recreate even the most complicated and intricate curves. The mesmerizing dance of these epicycles captures the essence of the original curve with astounding accuracy, captivating the imagination of users and demonstrating the profound capabilities of the Fourier transform.</p><p>With this drawing program, creativity knows no bounds. Users can experiment with different sets of epicycles, varying the number and sizes, and observe how these intricate motions converge to recreate a wide variety of continuous curves. The program becomes an interactive canvas for artistic expression, offering endless possibilities to bring complex designs to life.</p><p>I am immensely proud of this Fourier transform drawing program, as it showcases the beauty of mathematics and complex numbers in an accessible and visually stunning manner. It serves as a testament to the elegant fusion of art and science, unraveling the mathematical underpinnings of curves and unveiling their hidden symmetries with grace and precision.</p>",
    perlin: "<p><strong>Perlin Noise Animation</strong></p><p>Discover the fascinating world of Perlin noise through my JavaScript animation on the landing page. This mesmerizing display illustrates the workings of the Perlin noise equation, showcasing its elegant generation of smooth, natural-like patterns in a concise and captivating manner.</p>",
    candlesticks: "<p><strong>Candlestick Animation</strong></p><p>Experience the captivating world of candlestick animation on my landing page. This mesmerizing display mimics the behavior of candles from a real security, utilizing the Box-Muller Transform implemented in JavaScript to generate a natural-looking animation.</p><p>The animation draws inspiration from the normal distribution, artfully showcasing the fluctuating patterns and movements that securities often exhibit, particularly in smaller timeframes. The result is a visually striking and elegant representation of price movements, creating a beautiful and captivating display.</p><p>While not tied to any specific real-world asset, this candlestick animation mirrors the dynamic nature of securities, offering a fascinating glimpse into the intricacies of financial markets. Whether you are a seasoned trader or simply intrigued by the beauty of mathematical concepts in motion, this animation is sure to captivate your senses and leave you awe-inspired.</p>",
    gridtrader: "<p><strong>Grid Trading</strong></p><p>Allow me to introduce my powerful grid trading algorithm, meticulously crafted for intraday trading. This innovative approach leverages a grid of buy and sell orders, strategically placed at predefined price intervals.</p><p>The grid trader thrives on the concept of exploiting small price fluctuations that may occur even when the markets are not moving significantly. It capitalizes on these seemingly minor price movements by automatically executing buy and sell orders at different price levels, creating a series of profitable trades.</p><p>One of the key advantages of the grid trading algorithm lies in its ability to generate profits in relatively stable markets, where other trading strategies may struggle to find opportunities. By continually buying low and selling high within the established grid, the algorithm achieves consistent gains, offering an appealing option for intraday traders seeking a steady stream of profits.</p><p>However, it is crucial to acknowledge that while the grid trader can be remarkably profitable in certain market conditions, it also carries the potential for significant drawdowns, especially in volatile market environments. Versions of the grid trader applied to more volatile assets may showcase stunning profits, reaching close to 200%. Still, the possibility of substantial drawdowns necessitates prudent risk management to safeguard against potential losses.</p><p>Overall, my grid trading algorithm represents a valuable tool for intraday traders, providing an alternative strategy to capitalize on smaller price movements and generate consistent profits in various market conditions. As with any trading approach, understanding the inherent risks and employing sound risk management practices are essential for maximizing the potential of this powerful grid trader.</p>",
    dynamicportfolio: "<p><strong>Dynamic Portfolios</strong></p><p>Dynamic Portfolios represent one of the most intriguing quantitative trading techniques that leverage 'filters' to categorize assets based on various parameters like sectors, cashflow, price to earnings, yearly revenue, and more. This approach allows users to analyze numerous companies based on fundamental data, enabling the creation of highly specialized portfolios without exhaustive research on individual companies.</p><p>What sets these portfolios apart is their adaptability, as they can be regularly updated to replace underperforming companies with firms that excel based on the same parameters. This dynamic feature is ideal for crafting long-term portfolios with a strong focus on risk aversion, effectively mitigating unsystematic risk within the portfolio.</p><p>This strategy represents one of several that I have successfully implemented into the digital banking platform, potentially revolutionizing the way portfolios are designed and managed, both on a large and small scale.</p>",
    rlmodels: "<p><strong>Reinforcement Learning</strong></p><p>Reinforcement learning models, although relatively less known to the general public, are undeniably the most powerful type of models. What sets them apart is their ability to learn from a reward function instead of relying on labeled data, making them highly robust, especially on large datasets with varying payouts, such as the blackjack model.</p><p>Given their structure, RL models are ideally suited for trading financial assets since the reward function is clearly defined - essentially the amount of money each trade yields, weighted by the time value of money.</p><p>However, training RL models can be quite challenging, and they are prone to overfitting when trained on small datasets. A critical aspect of these models is the environment in which they operate, which must be meticulously constructed to ensure that they behave similarly to real-world conditions.</p><p>With careful construction, these models hold limitless potential and can be deployed in various scenarios, ranging from developing marketing strategies to data analytics and even game-playing tasks like blackjack and gomoku.</p>",
    deltahedge: "<p><strong>Delta Hedging</strong></p><p>Delta hedging is a widely used mathematical calculation employed to hedge positions against market movements using derivatives contracts. This sophisticated strategy involves complex computations, making it accessible mainly to large-scale investment companies.</p><p>At its core, the formula for delta hedging involves determining the number of shares or put contracts required to reduce portfolio volatility based on the delta, which represents the rate of change of a derivative contract's price relative to the underlying security. When executed correctly, these strategies effectively eliminate the risk from a trade, offering valuable risk management benefits.</p><p>I specialize in building Python models utilizing QuantConnect's LEAN API for various delta hedging strategies. These models allow me to leverage my expertise in calculus and quantitative finance, empowering me to navigate the complexities of financial markets with precision and confidence.</p>",
};

// Existing JavaScript code

// Function to list all commands
function listCommands(commands) {
    const commandList = Object.keys(commands);
    let response = "Available commands:<br>";
    commandList.forEach((command) => {
      response += `<span class="command">${command}</span><br>`;
    });
    return response;
  }
  
  commandInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      const command = commandInput.value.toLowerCase().trim();
      if (command === 'clear') {
        terminalBody.innerHTML = '';
      } else if (command === 'commands') {
        const response = listCommands(initCommands);
        const newLine = document.createElement('p');
        newLine.innerHTML = `user@portfolio: ${command}`;
        terminalBody.appendChild(newLine);
  
        const newResponse = document.createElement('p');
        newResponse.innerHTML = response;
        terminalBody.appendChild(newResponse);
      } else if (command in initCommands) {
        const response = initCommands[command];
        const newLine = document.createElement('p');
        newLine.innerHTML = `user@portfolio: ${command}`;
        terminalBody.appendChild(newLine);
        const newResponse = document.createElement('p');
        newResponse.innerHTML = response;
        terminalBody.appendChild(newResponse);
        if (command === 'projects') {
            const projectCommandsResponse = listCommands(projectCommands);
            const newLineProjectCommands = document.createElement('p');
            newLineProjectCommands.innerHTML = projectCommandsResponse;
            terminalBody.appendChild(newLineProjectCommands);
        }
      } else if (command in projectCommands) {
        const response = projectCommands[command];
        const newLine = document.createElement('p');
        newLine.innerHTML = `user@portfolio: ${command}`;
        terminalBody.appendChild(newLine);
  
        const newResponse = document.createElement('p');
        newResponse.innerHTML = response;
        terminalBody.appendChild(newResponse);
      } else {
        const response = `Command not found: ${command}`;
        const newLine = document.createElement('p');
        newLine.innerHTML = `user@portfolio: ${command}`;
        terminalBody.appendChild(newLine);
  
        const newResponse = document.createElement('p');
        newResponse.textContent = response;
        terminalBody.appendChild(newResponse);
      }
      commandInput.value = '';
    }
  });
  
  commandInput.focus();
