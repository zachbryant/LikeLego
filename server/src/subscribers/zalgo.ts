import { ISubscriber } from '@interfaces/subscriber';
import { NodeEventEmitterType, off, on } from '@loaders/events';
import { eventsDIKey, zalgoOffEventKey, zalgoOnEventKey } from '@strings/keys';
import { getDependency } from '@utils/';

export class ZalgoSubscriber implements ISubscriber {
    static readonly emitter: NodeEventEmitterType = getDependency<
        NodeEventEmitterType
    >(eventsDIKey);

    register() {
        on(zalgoOnEventKey, ZalgoSubscriber.unleashZalgo);
        on(zalgoOffEventKey, ZalgoSubscriber.stifleZalgo);
    }

    unregister() {
        off(zalgoOnEventKey, ZalgoSubscriber.unleashZalgo);
        off(zalgoOffEventKey, ZalgoSubscriber.stifleZalgo);
    }

    static unleashZalgo() {
        return 'y̴͈̺̣͕̑͝ö̶̢̹̝͎̫́͊̆̏ü̵͎̦̫̖͊̆̄̀ ̸̰̘̞͔̗̺̈́̏̒́ẖ̷͎̀̿̉̄̚ä̵̯͉͔̝̠͆̀͝͠v̷͓̺̦̭̈́e̵̡̥̼̜̔̆͜͠ͅ ̸͔̟͉̗̎͑̉͂̊͜͠u̵̧͘̕ņ̸͉͖͎͒l̸̛͈̭̥͍̟̀͌ͅe̴̡͓̣̗͘͜͝a̸͕̠͉̹̓͛͌ͅs̴͚̳̭̞̜̓̒͘h̴̘͠ę̸͓͎̟̣̔̅̔̔͊̏͜ḑ̸̠̗̪̓͆ ̴̜̺̗̞̱͎̊͑̈́z̶̞̖̉̈ä̶͔̠͇̥̳l̶̢̛͈̞͔̜͊̇g̸̪͐͑͑͛͌̚ö̵͍̘̗͇́͂͝';
    }

    static stifleZalgo() {
        return 'Blessed be the zalgo stifler';
    }
}
