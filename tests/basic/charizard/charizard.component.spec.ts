import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from '../../../src/app/basic/services/pokemon.service';
import { CharizardComponent } from '../../../src/app/basic/charizard/charizard.component';

describe('CharizardComponent', () => {
  let component: CharizardComponent;
  let fixture: ComponentFixture<CharizardComponent>;
  let compiled: HTMLElement;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharizardComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ PokemonService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharizardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match with snapshot', () => {
    expect(compiled.textContent).toMatchSnapshot();
  });

  test('should show initial loading', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent).toContain('Loading...')
  });

  test('should load charizard immediately', () => {
    const dummyPokemon = {
      name: 'charizardo',
      sprites: {
        front_default: 'https://charizard.com/sprite.png'
      }
    }

    const httpExpect = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/6');
    expect(httpExpect.request.method).toBe('GET');

    httpExpect.flush(dummyPokemon);

    fixture.detectChanges();
    // console.log(compiled.innerHTML);

    const h3 = compiled.querySelector('h3');
    const img = compiled.querySelector('img');

    expect(h3?.textContent?.toLowerCase()).toContain(dummyPokemon.name.toLowerCase());
    expect(img?.src).toBe(dummyPokemon.sprites.front_default);
    expect(img?.alt).toBe(dummyPokemon.name);
  });
});
