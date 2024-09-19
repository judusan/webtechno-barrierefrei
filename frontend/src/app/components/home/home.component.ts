import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  facts = [
    { title: 'Fact 1', description: 'There is enough food produced in the world to feed everyone.' },
    { title: 'Fact 2', description: 'One third of all food produced is lost or wasted – around 1.3 billion tonnes of food – costing the global economy close to $940 billion each year.' },
    { title: 'Fact 3', description: 'Up to 10% of global greenhouse gases comes from food that is produced, but not eaten.' },
    { title: 'Fact 4', description: 'Wasting food is worse than total emissions from flying (1.9%), plastic production (3.8%) and oil extraction (3.8%).' },
    { title: 'Fact 5', description: 'If food waste was a country, it would be the third biggest emitter of greenhouse gases after USA and China.' },
    { title: 'Fact 6', description: 'Food rotting in landfill releases methane – 28x stronger than carbon dioxide.' },
    { title: 'Fact 7', description: 'Eliminating global food waste would save 4.4 million tonnes of CO2 a year, the equivalent of taking one in four cars off the road.' },
    { title: 'Fact 8', description: 'One in nine people do not have enough food to eat, that’s 793 million people who are undernourished.' },
    { title: 'Fact 9', description: 'If one quarter of the food currently lost or wasted could be saved, it would be enough to feed 870 million hungry people.' },
    { title: 'Fact 10', description: 'Almost half of all fruit and vegetables produced are wasted (that’s 3.7 trillion apples).' },
    { title: 'Fact 11', description: 'Throwing away one burger wastes the same amount of water as a 90-minute shower.' },
    { title: 'Fact 12', description: 'It takes 25 years for a head of lettuce to decompose in landfill.' },
    { title: 'Fact 13', description: 'But the good news is, reducing food waste is the most effective thing individuals can do to address climate change.' }
  ];
}
