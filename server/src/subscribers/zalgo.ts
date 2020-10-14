import { EventEmitter } from 'events';
import { Inject } from 'typedi';

import { ISubscriber } from '@interfaces/subscriber';

export class ZalgoEventSubscriber implements ISubscriber {
    @Inject() emitter: EventEmitter;

    register() {
        throw new Error('Method not implemented.');
    }

    unregister() {
        throw new Error('Method not implemented.');
    }

    unleashZalgo() {
        return 'y̴͈̺̣͕̑͝ö̶̢̹̝͎̫́͊̆̏ü̵͎̦̫̖͊̆̄̀ ̸̰̘̞͔̗̺̈́̏̒́ẖ̷͎̀̿̉̄̚ä̵̯͉͔̝̠͆̀͝͠v̷͓̺̦̭̈́e̵̡̥̼̜̔̆͜͠ͅ ̸͔̟͉̗̎͑̉͂̊͜͠u̵̧͘̕ņ̸͉͖͎͒l̸̛͈̭̥͍̟̀͌ͅe̴̡͓̣̗͘͜͝a̸͕̠͉̹̓͛͌ͅs̴͚̳̭̞̜̓̒͘h̴̘͠ę̸͓͎̟̣̔̅̔̔͊̏͜ḑ̸̠̗̪̓͆ ̴̜̺̗̞̱͎̊͑̈́z̶̞̖̉̈ä̶͔̠͇̥̳l̶̢̛͈̞͔̜͊̇g̸̪͐͑͑͛͌̚ö̵͍̘̗͇́͂͝';
    }

    stifleZalgo() {
        return 'Blessed be the zalgo stifler';
    }
}
