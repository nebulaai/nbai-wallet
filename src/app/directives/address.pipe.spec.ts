import { AddressPipe } from './address.pipe';

describe('AddressPipe', () => {
  it('create an instance', () => {
    const pipe = new AddressPipe();
    expect(pipe).toBeTruthy();
  });

  it('empty should return empty', () => {
    const pipe = new AddressPipe();
    expect(pipe.transform('', 0, 0)).toEqual('');
  });

  it('normal address return first 10 and last 10 digi and connect with ...', () => {
    const pipe = new AddressPipe();
    expect(pipe.transform('0x1f7f8ba28414dd78efb7593d9ccef212a75859c823edbd6b6f9b0e3d4a4cf9b8', 10, 10)).toEqual('0x1f7f8ba2...3d4a4cf9b8');
  });

});