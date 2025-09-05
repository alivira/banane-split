import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import update from "immutability-helper";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>;

class App extends Component {
  state = {
    counters: [
      { id: uuidv4(), value: 7.83, itemName: "French Fries", quantity: 1 },
      { id: uuidv4(), value: 2.14, itemName: "Soda", quantity: 1 },
    ],
    users: [
      {
        id: uuidv4(),
        name: "Tom",
        total: 0,
        tax: 0,
        tip: 0,
        grandTotal: 0,
        bills: [{ billId: "sample", portion: 0 }],
      },
      {
        id: uuidv4(),
        name: "Dick",
        total: 0,
        tax: 0,
        tip: 0,
        grandTotal: 0,
        bills: [{ billId: "sample", portion: 0 }],
      },

      {
        id: uuidv4(),
        name: "Harry",
        total: 0,
        tax: 0,
        tip: 0,
        grandTotal: 0,
        bills: [{ billId: "sample", portion: 0 }],
      },
    ],
    totals: [
      {
        subTotal: 0,
        grandTotal: 0,
        tax: 0,
        taxRatio: 0,
        tip: 0,
        tipRatio: 0,
      },
    ],
    shareModalOpen: false,
    shortenURL: false,
  };

  componentDidMount() {
    // Try to load state from URL on component mount
    this.loadStateFromURL();
  }

  componentDidUpdate() {
    // Update URL whenever state changes
    this.updateURL();
  }

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
  };

  handleReset = () => {
    const resetState = {
      counters: [
        { id: uuidv4(), value: 7.83, itemName: "French Fries", quantity: 1 },
        { id: uuidv4(), value: 2.14, itemName: "Soda", quantity: 1 },
      ],
      users: [
        {
          id: uuidv4(),
          name: "Tom",
          total: 0,
          tax: 0,
          tip: 0,
          grandTotal: 0,
          bills: [{ billId: "sample", portion: 0 }],
        },
        {
          id: uuidv4(),
          name: "Dick",
          total: 0,
          tax: 0,
          tip: 0,
          grandTotal: 0,
          bills: [{ billId: "sample", portion: 0 }],
        },

        {
          id: uuidv4(),
          name: "Harry",
          total: 0,
          tax: 0,
          tip: 0,
          grandTotal: 0,
          bills: [{ billId: "sample", portion: 0 }],
        },
      ],
      totals: [
        {
          subTotal: 0,
          grandTotal: 0,
          tax: 0,
          taxRatio: 0,
          tip: 0,
          tipRatio: 0,
        },
      ],
    };
    this.setState({ counters: resetState.counters });
    this.setState({ users: resetState.users });
    this.setState({ totals: resetState.totals });
  };

  handleUpdateBillValue = (counter, e) => {
    var input = this.preventNegative(e);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = input;
    this.setState({ counters });
    // this.updateUserTotalBreakdown();
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
    console.log("Temp counters on Value: ", counters);
  };

  handleUpdateBillName = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].itemName = e;
    this.setState({ counters });
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
  };

  handleUpdateBillQuantity = (counter, e) => {
    var input = this.preventNegative(e);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].quantity = input;
    this.setState({ counters });
    console.log("Updated quantity", input);
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
  };

  handleUpdateBillPortion = (counter, user, portion) => {
    const newBillId = counter.id;
    console.log("billID: ", newBillId);
    console.log("Bills: ", this.state.counters);

    var newPortion = this.preventNegative(portion);
    if (!newPortion) {
      newPortion = 0;
    }
    console.log("newPortion: ", newPortion);

    const newUser = user;

    const newRow = { billId: newBillId, portion: newPortion };
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);

    console.log("userIndex", userIndex);

    var billIndex = -1;

    console.log("billIndex (before): ", billIndex);

    for (var i = 0; i < newUsers[userIndex].bills.length; i++) {
      if (newUsers[userIndex].bills[i].billId === newBillId) {
        billIndex = i;
        console.log(
          "Match!",
          i,
          newUsers[userIndex].bills[i].billId,
          newBillId
        );
        newUsers[userIndex].bills[billIndex].portion = newPortion;
      } else {
        console.log(
          "Failed to Match!",
          i,
          newUsers[userIndex].bills[i].billId,
          newBillId
        );
      }
    }
    console.log("billIndex (after): ", billIndex);

    if (billIndex === -1) {
      newUsers[userIndex].bills.push(newRow);
    }

    this.setState({ users: newUsers });
    console.log("New users (portion):", newUsers);
    this.updateUserTotalBreakdownTaxTip(
      newUsers,
      this.state.totals[0].tax,
      this.state.totals[0].tip
    );
  };

  handleUpdateName = (user, name) => {
    const newUser = user;
    const newName = name;
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);
    newUsers[userIndex].name = newName;
    this.setState({ users: newUsers });
  };

  handleAddRow = () => {
    const newId = uuidv4();
    const newRow = { id: newId, value: 0, name: "", quantity: 1 };
    const newArray = this.state.counters.slice();
    newArray.push(newRow);
    this.setState({ counters: newArray });
    // this.setState({ counters });
  };

  handleAddUser = () => {
    const newId = uuidv4();
    const newName = "Name";
    const newTotal = 0;
    const newTax = 0;
    const newTip = 0;
    const newGrandTotal = 0;
    const newRow = {
      id: newId,
      name: newName,
      total: newTotal,
      tax: newTax,
      tip: newTip,
      grandTotal: newGrandTotal,
      bills: [{ billId: "sample", portion: 0 }],
    };
    const newArray = this.state.users.slice();
    newArray.push(newRow);
    this.setState({ users: newArray });
  };

  handleRemoveUser = (userId) => {
    // Don't allow removing the last user
    if (this.state.users.length <= 1) {
      return;
    }
    
    const newUsers = this.state.users.filter((user) => user.id !== userId);
    
    // Update state first, then recalculate totals in the callback
    this.setState({ users: newUsers }, () => {
      // Recalculate totals after removing user using the value-based method
      // This ensures portions are recalculated correctly with updated state
      this.updateUserTotalBreakdownValue(
        this.state.users,
        this.state.totals[0].tax,
        this.state.totals[0].tip,
        this.state.counters
      );
    });
  };

  handleUpdateTax = (tax) => {
    const totals = [...this.state.totals];
    totals.tax = tax;
    this.setState({
      totals: update(this.state.totals, { 0: { tax: { $set: tax } } }),
    });
    this.updateUserTotalBreakdownTaxTip(
      this.state.users,
      tax,
      this.state.totals[0].tip
    );
  };

  handleUpdateTip = (tip) => {
    const totals = [...this.state.totals];
    totals.tip = tip;
    this.setState({
      totals: update(this.state.totals, { 0: { tip: { $set: tip } } }),
    });
    this.updateUserTotalBreakdownTaxTip(
      this.state.users,
      this.state.totals[0].tax,
      tip
    );
  };

  updateUserTotalBreakdownTaxTip = (users, tax, tip) => {
    let newUsers = users;
    for (let i = 0; i < newUsers.length; i++) {
      newUsers[i].total = this.calculateUserSubTotal(newUsers[i]);
      var ratio = Number(this.calculateUserRatio(newUsers[i]));
      newUsers[i].tax = Number(tax) * ratio;
      newUsers[i].tip = Number(tip) * ratio;
      newUsers[i].grandTotal =
        newUsers[i].total + newUsers[i].tax + newUsers[i].tip;
    }

    this.setState({ users: newUsers });
  };

  updateUserTotalBreakdownValue = (users, tax, tip, counters) => {
    let newUsers = users;
    for (let i = 0; i < newUsers.length; i++) {
      newUsers[i].total = this.calculateUserSubTotalValue(
        newUsers[i],
        counters
      );
      var ratio =
        Number(newUsers[i].total) /
        Number(this.calculateGlobalSubTotalValue(counters));
      newUsers[i].tax = Number(tax) * ratio;
      newUsers[i].tip = Number(tip) * ratio;
      newUsers[i].grandTotal =
        newUsers[i].total + newUsers[i].tax + newUsers[i].tip;
    }

    // Also update the global totals
    const globalSubTotal = this.calculateGlobalSubTotalValue(counters);
    const globalGrandTotal = globalSubTotal + Number(tax) + Number(tip);
    
    this.setState({ 
      users: newUsers,
      totals: [{
        subTotal: globalSubTotal,
        grandTotal: globalGrandTotal,
        tax: Number(tax),
        taxRatio: Number(tax) / globalSubTotal,
        tip: Number(tip),
        tipRatio: Number(tip) / globalSubTotal
      }]
    });
  };

  calculateUserSubTotalValue = (user, counters) => {
    var bills = counters;
    var total = 0;

    for (let i = 0; i < user.bills.length; i++) {
      for (let j = 0; j < bills.length; j++) {
        if (
          user.bills[i].billId === bills[j].id &&
          this.findPortionTotals(bills[j].id) > 0
        ) {
          total +=
            bills[j].value *
            bills[j].quantity *
            (user.bills[i].portion / this.findPortionTotals(bills[j].id));
        }
      }
    }
    return total;
  };

  calculateGlobalSubTotalValue = (counters) => {
    var count = 0;
    for (var i = 0, n = counters.length; i < n; i++) {
      count += counters[i].quantity * counters[i].value;
      console.log("Global count:", count);
    }

    return count;
  };

  //Finds the total portions (shares) for a bill item
  findPortionTotals = (billId) => {
    var total = 0;
    for (let i = 0; i < this.state.users.length; i++) {
      for (let j = 0; j < this.state.users[i].bills.length; j++)
        if (this.state.users[i].bills[j].billId === billId) {
          total += this.state.users[i].bills[j].portion;
        }
    }
    return total;
  };

  //Finds the total owed without tax & tip per user
  calculateUserSubTotal = (user) => {
    var bills = this.state.counters.slice();
    var total = 0;

    for (let i = 0; i < user.bills.length; i++) {
      for (let j = 0; j < bills.length; j++) {
        if (
          user.bills[i].billId === bills[j].id &&
          this.findPortionTotals(bills[j].id) > 0
        ) {
          total +=
            bills[j].value *
            bills[j].quantity *
            (user.bills[i].portion / this.findPortionTotals(bills[j].id));
        }
      }
    }
    return total;
  };

  //Finds the total tax owed per user
  calculateUserTax = (user) => {
    var ratio = 0;
    var tax = 0;

    ratio = Number(user.total) / Number(this.calculateGlobalSubTotal());
    tax = Number(this.state.totals[0].tax) * ratio;

    return tax;
  };

  //Finds the total tax owed per user
  calculateUserTip = (user) => {
    var ratio = 0;
    var tip = 0;

    ratio = Number(user.total) / Number(this.calculateGlobalSubTotal());
    tip = Number(this.state.totals[0].tip) * ratio;

    return tip;
  };

  calculateUserRatio = (user) => {
    return Number(user.total) / Number(this.calculateGlobalSubTotal());
  };

  //Calculates global subtotal
  calculateGlobalSubTotal = () => {
    var count = 0;
    for (var i = 0, n = this.state.counters.length; i < n; i++) {
      count += this.state.counters[i].value * this.state.counters[i].quantity;
    }

    return count;
  };

  //Calculates global grand total
  calculateGlobalGrandTotal = () => {
    var count = this.calculateGlobalSubTotal();
    count +=
      Number(this.state.totals[0].tax) + Number(this.state.totals[0].tip);
    return count;
  };

  preventNegative = (input) => {
    return input < 0 ? 0 : input;
  };

  // URL State Management with Dual Compression
  encodeStateToURL = (isShareMode = false) => {
    // Create ultra-minimal state object with maximum compression
    const minimalState = {
      c: this.state.counters.map(counter => ({
        v: Math.round(counter.value * 100), // Store as integer (cents)
        n: counter.itemName, // No length limit
        q: counter.quantity
      })),
      u: this.state.users.map(user => ({
        n: user.name, // No length limit
        b: user.bills.map(bill => ({
          i: this.state.counters.findIndex(c => c.id === bill.billId),
          p: bill.portion
        }))
      })),
      t: {
        x: Math.round(this.state.totals[0].tax * 100), // Store as integer (cents)
        p: Math.round(this.state.totals[0].tip * 100)
      }
    };
    
    try {
      if (isShareMode) {
        // Ultra-compressed mode for sharing (like Google Docs)
        return this.encodeUltraCompressed(minimalState);
      } else {
        // Normal mode for editing (more readable)
        return this.encodeNormal(minimalState);
      }
    } catch (error) {
      console.error('Error encoding state:', error);
      return btoa(JSON.stringify(minimalState));
    }
  };

  // Ultra-compressed encoding for sharing
  encodeUltraCompressed = (minimalState) => {
    // Convert to compact string format
    const jsonString = JSON.stringify(minimalState);
    
    // Apply maximum compression techniques
    const compressed = this.compressString(jsonString);
    
    console.log('SHARE MODE - Original JSON length:', jsonString.length);
    console.log('SHARE MODE - Compressed length:', compressed.length);
    console.log('SHARE MODE - Compression ratio:', (jsonString.length / compressed.length).toFixed(2) + 'x');
    
    return compressed;
  };

  // Normal encoding for editing
  encodeNormal = (minimalState) => {
    // Use simple base64 with URL-safe characters for normal editing
    const jsonString = JSON.stringify(minimalState);
    const base64 = btoa(jsonString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    
    console.log('EDIT MODE - JSON length:', jsonString.length);
    console.log('EDIT MODE - Base64 length:', base64.length);
    
    return base64;
  };

  // Ultra-compressed state using simple compression
  compressString = (str) => {
    // Step 1: Remove whitespace
    let compressed = str.replace(/\s+/g, '');
    
    // Step 2: Replace common JSON patterns with shorter versions
    compressed = compressed
      .replace(/"c":/g, 'c:')        // Remove quotes around 'c'
      .replace(/"u":/g, 'u:')        // Remove quotes around 'u'
      .replace(/"t":/g, 't:')        // Remove quotes around 't'
      .replace(/"v":/g, 'v:')        // Remove quotes around 'v'
      .replace(/"n":/g, 'n:')        // Remove quotes around 'n'
      .replace(/"q":/g, 'q:')        // Remove quotes around 'q'
      .replace(/"b":/g, 'b:')        // Remove quotes around 'b'
      .replace(/"i":/g, 'i:')        // Remove quotes around 'i'
      .replace(/"p":/g, 'p:')        // Remove quotes around 'p'
      .replace(/"x":/g, 'x:');       // Remove quotes around 'x'
    
    console.log('SHARE MODE - Original length:', str.length);
    console.log('SHARE MODE - Compressed length:', compressed.length);
    console.log('SHARE MODE - Savings:', str.length - compressed.length, 'characters');
    
    // Step 3: Use URL-safe Base64 encoding
    return btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };

  // Convert string to Base62 (A-Z, a-z, 0-9)
  toBase62 = (str) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Convert string to number first
    let num = 0;
    for (let i = 0; i < str.length; i++) {
      num = num * 256 + str.charCodeAt(i);
    }
    
    // Convert number to Base62
    while (num > 0) {
      result = chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    
    return result || '0';
  };

  // Convert from Base62 back to string
  fromBase62 = (str) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let num = 0;
    
    // Convert Base62 to number
    for (let i = 0; i < str.length; i++) {
      num = num * 62 + chars.indexOf(str[i]);
    }
    
    // Convert number back to string
    let result = '';
    while (num > 0) {
      result = String.fromCharCode(num % 256) + result;
      num = Math.floor(num / 256);
    }
    
    return result;
  };



  decodeStateFromURL = (encodedState) => {
    try {
      console.log('Raw encoded state:', encodedState.substring(0, 50) + '...');
      // Detect if this is a compressed share URL or normal edit URL
      const isCompressed = this.isCompressedURL(encodedState);
      console.log('Is compressed?', isCompressed);
      
      let decoded;
      if (isCompressed) {
        // Decode compressed share URL
        decoded = this.decodeCompressed(encodedState);
        console.log('Decoded COMPRESSED share URL');
      } else {
        // Decode normal edit URL
        decoded = this.decodeNormal(encodedState);
        console.log('Decoded NORMAL edit URL');
      }
      
      if (!decoded) {
        console.log('Failed to decode state');
        return null;
      }
      
      // Generate new counter IDs first
      const newCounters = decoded.c.map(counter => ({
        id: uuidv4(),
        value: counter.v / 100, // Convert back from cents
        itemName: counter.n,
        quantity: counter.q
      }));
      
      // Convert minimal state back to full state format
      const fullState = {
        counters: newCounters,
        users: decoded.u.map((user, index) => ({
          id: uuidv4(), // Generate new user IDs
          name: user.n,
          total: 0, // Will be recalculated
          tax: 0, // Will be recalculated
          tip: 0, // Will be recalculated
          grandTotal: 0, // Will be recalculated
          bills: user.b.map(bill => ({
            billId: newCounters[bill.i] ? newCounters[bill.i].id : uuidv4(), // Map index to new ID
            portion: bill.p
          }))
        })),
        totals: [{
          subTotal: 0, // Will be recalculated
          grandTotal: 0, // Will be recalculated
          tax: decoded.t.x / 100, // Convert back from cents
          taxRatio: 0, // Will be recalculated
          tip: decoded.t.p / 100, // Convert back from cents
          tipRatio: 0 // Will be recalculated
        }]
      };
      
      return fullState;
    } catch (error) {
      console.error('Error decoding state from URL:', error);
      return null;
    }
  };

  // Detect if URL is compressed (Base62) or normal (Base64)
  isCompressedURL = (encodedState) => {
    // Check if the decoded content has compressed format (missing quotes around keys)
    try {
      const base64 = encodedState.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '==='.slice((base64.length + 3) % 4);
      const decoded = atob(padded);
      
      // If it contains unquoted keys like "c:", "v:", "n:", it's compressed
      return /[^"]c:|[^"]v:|[^"]n:|[^"]q:|[^"]u:|[^"]b:|[^"]i:|[^"]p:|[^"]t:|[^"]x:/.test(decoded);
    } catch {
      // If decoding fails, assume it's compressed if it contains - or _
      return /[-_]/.test(encodedState) && !/[+/=]/.test(encodedState);
    }
  };

  // Decode compressed share URL
  decodeCompressed = (encodedState) => {
    try {
      // Convert from URL-safe Base64 back to string
      const base64 = encodedState.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '==='.slice((base64.length + 3) % 4);
      const compressedString = atob(padded);
      
      console.log('SHARE MODE - Compressed string:', compressedString.substring(0, 100) + '...');
      
      // Reverse the compression transformations
      let jsonString = compressedString
        .replace(/c:/g, '"c":')      // Add quotes back around 'c'
        .replace(/u:/g, '"u":')      // Add quotes back around 'u'
        .replace(/t:/g, '"t":')      // Add quotes back around 't'
        .replace(/v:/g, '"v":')      // Add quotes back around 'v'
        .replace(/n:/g, '"n":')      // Add quotes back around 'n'
        .replace(/q:/g, '"q":')      // Add quotes back around 'q'
        .replace(/b:/g, '"b":')      // Add quotes back around 'b'
        .replace(/i:/g, '"i":')      // Add quotes back around 'i'
        .replace(/p:/g, '"p":')      // Add quotes back around 'p'
        .replace(/x:/g, '"x":');     // Add quotes back around 'x'
      
      console.log('SHARE MODE - Decoded JSON string:', jsonString.substring(0, 100) + '...');
      
      // Parse the JSON
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error decoding compressed URL:', error);
      return null;
    }
  };

  // Decode normal edit URL
  decodeNormal = (encodedState) => {
    try {
      console.log('Decoding normal URL:', encodedState.substring(0, 50) + '...');
      
      // Add padding back and convert URL-safe base64 to regular base64
      const padded = encodedState + '==='.slice((encodedState.length + 3) % 4);
      const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
      
      // Decode from base64
      const jsonString = atob(base64);
      console.log('Decoded JSON string:', jsonString.substring(0, 100) + '...');
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error decoding normal URL:', error);
      console.error('Encoded state:', encodedState);
      return null;
    }
  };

  updateURL = () => {
    const encodedState = this.encodeStateToURL();
    const newURL = `${window.location.origin}${window.location.pathname}#${encodedState}`;
    window.history.replaceState(null, null, newURL);
  };

  loadStateFromURL = () => {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash && hash.length > 0) {
      console.log('Loading state from URL hash:', hash.substring(0, 50) + '...');
      const decodedState = this.decodeStateFromURL(hash);
      if (decodedState) {
        this.setState(decodedState, () => {
          // Recalculate totals after loading state using the decoded values
          this.updateUserTotalBreakdownValue(
            decodedState.users,
            decodedState.totals[0].tax,
            decodedState.totals[0].tip,
            decodedState.counters
          );
        });
        return true;
      } else {
        console.log('Failed to decode state from URL, using default state');
        // Clear the hash if it's malformed
        window.history.replaceState(null, null, window.location.pathname);
      }
    } else {
      console.log('No hash found in URL, using default state');
    }
    return false;
  };

  generateShareLink = () => {
    const encodedState = this.encodeStateToURL(true); // Use compressed mode for sharing
    return `${window.location.origin}${window.location.pathname}#${encodedState}`;
  };

  // Share modal handlers
  handleOpenShareModal = () => {
    this.setState({ shareModalOpen: true });
  };

  handleCloseShareModal = () => {
    this.setState({ shareModalOpen: false });
  };

  handleShortenToggle = () => {
    this.setState({ shortenURL: !this.state.shortenURL });
  };

  copyShareLink = async () => {
    const shareLink = this.state.shortenURL ? this.generateShareLink() : this.generateNormalLink();
    try {
      await navigator.clipboard.writeText(shareLink);
      alert('Share link copied to clipboard!');
      this.handleCloseShareModal();
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Share link copied to clipboard!');
      this.handleCloseShareModal();
    }
  };

  generateNormalLink = () => {
    const encodedState = this.encodeStateToURL(false); // Use normal mode
    return `${window.location.origin}${window.location.pathname}#${encodedState}`;
  };

  render() {
    console.log(this.state.users);

    return (
      <React.Fragment>
        <NavBar totalCounters={this.calculateGlobalSubTotal()} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            users={this.state.users}
            totals={this.state.totals}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onAddRow={this.handleAddRow}
            onAddUser={this.handleAddUser}
            onRemoveUser={this.handleRemoveUser}
            updateValue={this.handleUpdateBillValue}
            updateBillName={this.handleUpdateBillName}
            updateBillQuantity={this.handleUpdateBillQuantity}
            updateBill={this.handleUpdateBillPortion}
            updateName={this.handleUpdateName}
            updateTax={this.handleUpdateTax}
            updateTip={this.handleUpdateTip}
            subtotal={this.calculateGlobalSubTotal()}
            grandtotal={this.calculateGlobalGrandTotal()}
            onShare={this.handleOpenShareModal}
          />
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
              padding: "10px",
              width: "200px",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "200" }}>
              made with &#x1F497; by{" "}
              <a
                style={{ color: "#FEB83E", fontWeight: "400" }}
                href="https://linktr.ee/alivira"
              >
                ali
              </a>
            </p>
            <a href="https://www.buymeacoffee.com/alivira" target="_blank">
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{
                  margin: "auto",
                  display: "block",
                  width: "75%",
                }}
              />
            </a>
          </div>

          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
              marginBottom: "30px",
              padding: "10px",
              width: "300px",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "200" }}>
              <a
                style={{ color: "#FEB83E", fontWeight: "400" }}
                href="https://github.com/alivira/banane-split"
                target="_blank"
                rel="noreferrer"
              >
                contribute
              </a>
              <br></br>
              <a
                style={{ color: "#FEB83E", fontWeight: "200", fontSize: "8pt" }}
                href="https://github.com/alivira/banane-split/blob/master/LICENSE"
                target="_blank"
                rel="noreferrer"
              >
                Some Rights Reserved (c) | MIT License
              </a>
            </p>
          </div>
        </main>

        {/* Share Modal */}
        {this.state.shareModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={this.handleCloseShareModal}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                maxWidth: "500px",
                width: "90%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
                Share Bill Split
              </h3>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={this.state.shortenURL}
                    onChange={this.handleShortenToggle}
                    style={{ marginRight: "10px" }}
                  />
                  <span>Shorten URL</span>
                </label>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  Share Link:
                </label>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    wordBreak: "break-all",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                >
                  {this.state.shortenURL ? this.generateShareLink() : this.generateNormalLink()}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={this.handleCloseShareModal}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={this.copyShareLink}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#FEB83E",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
